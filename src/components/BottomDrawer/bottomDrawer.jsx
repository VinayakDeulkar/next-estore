import React, { useContext, useEffect, useState } from "react";
import Spinner from "../common/Spinner/spinner";
import { AppContext } from "@/context/AppContext";
import {
  changeArea,
  deleteUserAddress,
  getScheduleTime,
  GetUserDetails,
} from "@/apis";
import { useRouter } from "next/navigation";
import AddressCard from "../common/AddressCard/AddressCard";
import Pointer from "@/SVGs/Pointer";
import ThreeDots from "@/SVGs/ThreeDots";
import SubHeadline from "../assetBoxDesign/SubHeadline/subHeadline";
import RightArrow from "@/SVGs/RightArrow";
import LocationIcon from "@/SVGs/LocationIcon";
import { getAddressType } from "@/constants/function";
import Divider from "../Divider/Divider";
import moment from "moment";
import "./BottomDrawer.css";
import { tele } from "@/constants/constants";
import { SwipeableDrawer } from "@mui/material";


const drawerBleeding = 56;

const BottomDrawer = ({ type, onClick, hideAddress }) => {
  const {
    language,
    vendorSlug,
    areaDetails,
    handleAreaDetailsChange,
    userDetails,
    handleUserDetailsChange,
    resetUserDetails,
    handleAddressDetailsChange,
    homePageDetails,
  } = useContext(AppContext);
  const router = useRouter();
  const [addressData, setAddressData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAddressData = () => {
    if (userDetails.address) {
      const addresslist = userDetails.address.map((ele) => {
        return {
          id: ele.id,
          addressName: ele.title ?? ele.addressName,
          addressType: ele.address_type,
          area: ele.area,
          area_id: ele.area_id,
          ar_area: ele.ar_area,
          street: ele.street,
          block: ele.block,
          avenue: ele.avenue,
          house: ele.house_number,
          floor: ele.floor_number,
          flat: ele.flat_number,
          special_directions: ele?.special_directions,
          lat: ele?.latitude,
          lng: ele?.longitude,
          is_primary: ele?.is_primary,
        };
      });
      setAddressData(addresslist);
    }
  };

  useEffect(() => {
    getAddressData();
  }, [userDetails.address, userDetails.address?.length]);

  const houseLabel = (addressType) => {
    switch (addressType) {
      case "1":
        return language == "ltr" ? "House No." : "عمارة";
      case "2":
      case "3":
        return language == "ltr" ? "Building No." : "عمارة";
      case "4":
        return language == "ltr" ? "School Name" : "اسم المدرسة";
      case "5":
        return language == "ltr" ? "Mosque Name" : "اسم المسجد";
      case "6":
        return language == "ltr" ? "Government Entity" : "مبنى حكومة";
      default:
        return "";
    }
  };
  const flatLabel = (addressType) => {
    switch (addressType) {
      case "2":
        return language == "ltr" ? "Flat No." : "رقم الشقة";
      case "3":
        return language == "ltr" ? "Office No." : "رقم المكتب";

      default:
        return "";
    }
  };

  const updateAddress = (id) => {
    addressData.map(async (address) => {
      if (address.id == id) {
        handleAddressDetailsChange((k) => ({
          ...k,
          addressName: address.addressName ?? address.title,
          id: address.id,
          addressType: address.addressType,
          street: address.street,
          block: address.block,
          avenue: address.avenue,
          house: address.house,
          floor: address.floor,
          flat: address.flat,
          special_directions: address.special_directions,
          lat: address.lat,
          lng: address.lng,
          is_primary: address.is_primary,
        }));
        let findAreaDetails = {};
        areaDetails.data.governarate?.map((governarate) =>
          governarate.area.map((area) => {
            if (area.area_id == address.area_id) {
              findAreaDetails = area;
            }
          })
        );
        const response = await changeArea({
          vendors_id: homePageDetails?.vendor_data?.vendors_id,
          area_id: address.area_id,
          vendorSlug: vendorSlug?.data?.ecom_url_slug,
          user_string: localStorage.getItem("userID"),
        });
        if (response.status === true) {
          if (response.data.show_popup === 0) {
            const timeResponse = await getScheduleTime({
              vendors_id: homePageDetails?.vendor_data?.vendors_id,
              area_id: address.area_id,
              vendorSlug: vendorSlug?.data?.ecom_url_slug,
            });
            if (timeResponse.status) {
              let selectedBranch = timeResponse.data.branch;
              let activeBranch = areaDetails?.data?.branch?.filter(
                (branch) => branch?.id == selectedBranch?.id
              )[0];
              let estimationTime =
                timeResponse.data?.delivery_details?.delivery_expected_type != 6
                  ? timeResponse.data?.delivery_details?.delivery_expected_time
                  : 0;
              if (
                timeResponse.data.time == 1 &&
                findAreaDetails.availability_status == 1
              ) {
                handleAreaDetailsChange((k) => ({
                  ...areaDetails,
                  area: address.area,
                  minimum: findAreaDetails.minimum_charge,
                  shopOpen: timeResponse.data.time,
                  now: timeResponse.data.time,
                  branch: "",
                  ar_branch: "",
                  ar_area: address.ar_area,
                  area_id: address.area_id,
                  deliveryTiming: timeResponse.data.schedule_time,
                  ar_deliveryTiming: timeResponse.data.schedule_time_ar,
                  customDelivery:
                    timeResponse.data?.delivery_details
                      ?.delivery_expected_type == 6,

                  getDeliveryTiming: moment()
                    .add(estimationTime, "minutes")
                    .toDate(),
                  laterDeliveryTiming: moment()
                    .add(estimationTime, "minutes")
                    .toDate(),
                  branchForArea: {
                    ...timeResponse.data.branch,
                    end:
                      activeBranch?.office_end_time >
                      activeBranch?.office_start_time
                        ? moment(activeBranch?.office_end_time, "HH:mm:ss")
                        : moment(activeBranch?.office_end_time, "HH:mm:ss").add(
                            1,
                            "days"
                          ),
                    start: moment(activeBranch?.office_start_time, "HH:mm:ss"),
                  },
                }));
              } else {
                handleAreaDetailsChange((l) => ({
                  ...areaDetails,
                  area: address.area,
                  minimum: findAreaDetails.minimum_charge,
                  shopOpen:
                    findAreaDetails.availability_status == 1
                      ? timeResponse.data.time
                      : 2,
                  now:
                    findAreaDetails.availability_status == 1
                      ? timeResponse.data.time
                      : 2,
                  ar_area: address.ar_area,
                  area_id: address.area_id,
                  branch: "",
                  ar_branch: "",
                  deliveryTiming: timeResponse?.data?.schedule_time,
                  ar_deliveryTiming: timeResponse?.data?.schedule_time_ar,
                  customDelivery:
                    timeResponse.data?.delivery_details
                      ?.delivery_expected_type == 6,
                  getDeliveryTiming:
                    findAreaDetails.availability_status == 1 ||
                    timeResponse.data.time == 2
                      ? moment(
                          timeResponse.data.preorder_on,
                          "YYYY-MM-DD HH:mm:ss"
                        ).toDate()
                      : moment().add(estimationTime, "minutes").toDate(),
                  laterDeliveryTiming:
                    findAreaDetails.availability_status == 1 ||
                    timeResponse.data.time == 2
                      ? moment(
                          timeResponse.data.preorder_on,
                          "YYYY-MM-DD HH:mm:ss"
                        ).toDate()
                      : moment().add(estimationTime, "minutes").toDate(),
                  branchForArea: {
                    ...timeResponse.data.branch,
                    end:
                      activeBranch?.office_end_time >
                      activeBranch?.office_start_time
                        ? moment(activeBranch?.office_end_time, "HH:mm:ss")
                        : moment(activeBranch?.office_end_time, "HH:mm:ss").add(
                            1,
                            "days"
                          ),
                    start: moment(activeBranch?.office_start_time, "HH:mm:ss"),
                  },
                }));
              }
            } else {
            }
          } else {
          }
        }
        router.push("/delivery-address");
      }
    });
  };

  const updateUserResponse = async () => {
    const contactInfo = JSON.parse(localStorage.getItem("contactInfo"));
    const response = await GetUserDetails({
      vendor_id: homePageDetails?.vendor_data.vendors_id,
      sendSMS: false,
      country_code: `+${tele[contactInfo.code]}`,
      phone_number: contactInfo.phone,
      jwt_token: localStorage.getItem("token"),
      user_id: localStorage.getItem("id"),
      language: language,
    });
    if (response?.status) {
      handleUserDetailsChange({ ...response?.data });
      if (response?.data?.address?.length == 0) {
        handleAddressDetailsChange({
          block: "",
          street: "",
          avenue: "",
          house: "",
          floor: "",
          flat: "",
          special_directions: "",
          lat: 29.378,
          lng: 47.99,
          fixedLat: 29.378,
          fixedLng: 47.99,
          addressString: "",
          addressType: "1",
        });
        router.push("/");
      }
    } else {
      toast.error(response?.message);
      localStorage.removeItem("token");
      localStorage.removeItem("contactInfo");
      resetUserDetails();
    }
  };

  const deleteAddress = async (id) => {
    setLoading(true);

    const response = await deleteUserAddress({
      ecom_user_id: userDetails.id,
      address_id: id,
      jwt_token: localStorage.getItem("token"),
      user_id: localStorage.getItem("id"),
      language: language,
    });
    if (response.status) {
      setLoading(false);
      updateUserResponse();
    } else {
      setLoading(false);
      toast.error(response?.message);
    }
  };

  const handleAddressClick = async (addressData) => {
    handleAddressDetailsChange((prev) => ({
      ...prev,
      id: addressData.id,
      area_id: addressData.area_id,
      block: addressData.block,
      street: addressData.street,
      avenue: addressData.avenue,
      house: addressData.house,
      floor: addressData.floor_number ?? addressData.floor,
      flat: addressData.flat_number ?? addressData.flat,
      lat: addressData.latitude ?? addressData.lat,
      lng: addressData.longitude ?? addressData.lng,
      fixedLat: addressData.latitude ?? addressData.lat,
      fixedLng: addressData.longitude ?? addressData.lng,
      addressType: addressData.addressType,
      addressName: addressData.addressName,
      special_directions: addressData?.special_directions,
    }));
    const addedAddress = [];
    areaDetails.data.governarate.forEach((address) => {
      const foundAddress = address.area.find(
        (area) => area.area_id == addressData.area_id
      );
      if (foundAddress) {
        addedAddress.push(foundAddress);
      }
    });

    const changeAreaResponse = await changeArea({
      vendors_id: homePageDetails?.vendor_data?.vendors_id,
      area_id: addressData.area_id,
      vendorSlug: vendorSlug?.data?.ecom_url_slug,
      user_string: localStorage.getItem("userID"),
    });
    if (changeAreaResponse.status === true) {
      if (changeAreaResponse.data.show_popup === 0) {
        const timeResponse = await getScheduleTime({
          vendors_id: homePageDetails?.vendor_data?.vendors_id,
          area_id: addressData.area_id,
          vendorSlug: vendorSlug?.data?.ecom_url_slug,
        });
        if (timeResponse.status) {
          let selectedBranch = timeResponse.data.branch;
          let activeBranch = areaDetails?.data?.branch?.filter(
            (branch) => branch?.id == selectedBranch?.id
          )[0];
          let estimationTime =
            timeResponse.data?.delivery_details?.delivery_expected_type != 6
              ? timeResponse.data?.delivery_details?.delivery_expected_time
              : 0;
          if (
            timeResponse.data.time == 1 &&
            addedAddress[0].availability_status == 1
          ) {
            handleAreaDetailsChange((k) => ({
              ...k,
              area: addedAddress[0].area_name,
              minimum: addedAddress[0].minimum_charge,
              shopOpen: timeResponse.data.time,
              now: timeResponse.data.time,
              branch: "",
              ar_branch: "",
              ar_area: addedAddress[0].area_name_ar,
              area_id: addedAddress[0].area_id,
              deliveryTiming: timeResponse.data.schedule_time,
              ar_deliveryTiming: timeResponse.data.schedule_time_ar,
              customDelivery:
                timeResponse.data?.delivery_details?.delivery_expected_type ==
                6,

              getDeliveryTiming: moment()
                .add(estimationTime, "minutes")
                .toDate(),
              laterDeliveryTiming: moment()
                .add(estimationTime, "minutes")
                .toDate(),
              branchForArea: {
                ...timeResponse.data.branch,
                end:
                  activeBranch?.office_end_time >
                  activeBranch?.office_start_time
                    ? moment(activeBranch?.office_end_time, "HH:mm:ss")
                    : moment(activeBranch?.office_end_time, "HH:mm:ss").add(
                        1,
                        "days"
                      ),
                start: moment(activeBranch?.office_start_time, "HH:mm:ss"),
              },
            }));
          } else {
            handleAreaDetailsChange((l) => ({
              ...l,
              area: addedAddress[0].area_name,
              minimum: addedAddress[0].minimum_charge,
              shopOpen:
                addedAddress[0].availability_status == 1
                  ? timeResponse.data.time
                  : 2,
              now:
                addedAddress[0].availability_status == 1
                  ? timeResponse.data.time
                  : 2,
              ar_area: addedAddress[0].area_name_ar,
              area_id: addedAddress[0].area_id,
              branch: "",
              ar_branch: "",
              deliveryTiming: timeResponse?.data?.schedule_time,
              ar_deliveryTiming: timeResponse?.data?.schedule_time_ar,
              customDelivery:
                timeResponse.data?.delivery_details?.delivery_expected_type ==
                6,
              getDeliveryTiming:
                addedAddress[0].availability_status == 1 ||
                timeResponse.data.time == 2
                  ? moment(
                      timeResponse.data.preorder_on,
                      "YYYY-MM-DD HH:mm:ss"
                    ).toDate()
                  : moment().add(estimationTime, "minutes").toDate(),
              laterDeliveryTiming:
                addedAddress[0].availability_status == 1 ||
                timeResponse.data.time == 2
                  ? moment(
                      timeResponse.data.preorder_on,
                      "YYYY-MM-DD HH:mm:ss"
                    ).toDate()
                  : moment().add(estimationTime, "minutes").toDate(),
              branchForArea: {
                ...timeResponse.data.branch,
                end:
                  activeBranch?.office_end_time >
                  activeBranch?.office_start_time
                    ? moment(activeBranch?.office_end_time, "HH:mm:ss")
                    : moment(activeBranch?.office_end_time, "HH:mm:ss").add(
                        1,
                        "days"
                      ),
                start: moment(activeBranch?.office_start_time, "HH:mm:ss"),
              },
            }));
          }
        } else {
        }
      } else {
      }
    }
    if (type === "checkout") {
      router.push("/checkout");
      onClick();
    } else {
      if (localStorage.getItem("newPath") == "review") {
        localStorage.removeItem("newPath");
        router.push("/checkout");
      } else {
        router.push("/");
      }
    }
  };
  return (
    <div id="bottomDrawer">
      <SwipeableDrawer
        anchor="bottom"
        open={true}
        onClose={() => {}}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={true}
        PaperProps={{
          sx: {
            width: window.innerWidth > 990 ? "37.555%" : "100%",
            position: "absolute",
            bottom: 0,
            left: 0,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            backgroundColor: "#f5f5f5",
          },
        }}
        container={
          typeof window !== "undefined"
            ? () => document.getElementById("drawer-container")
            : undefined
        }
      >
        <div className="drawerOuterDiv">
          <div className="drawerInnerDiv">
            <SubHeadline
              enText={"Select your delivery address"}
              arText={"حدد عنوان التسليم الخاص بك"}
            />

            {addressData.map((address, i) => (
              <div key={i}>
                <div>
                  <AddressCard
                    cardClick={() => handleAddressClick(address)}
                    icon={getAddressType(address.addressType, "", "28px")}
                    info={{
                      name: address?.addressName,
                      area:
                        language === "ltr"
                          ? address.area
                          : address.ar_area
                          ? address.ar_area
                          : address.area,
                      addressFirst: `${
                        language == "ltr" ? "Street" : "شارع "
                      } ${address?.street}
                  ${", "}
                  ${language == "ltr" ? "Block" : "قطعة "} ${address?.block}
                  ${", "}
                  ${houseLabel(address?.addressType)} ${address?.house}
                  ${
                    address?.avenue || address?.floor || address?.flat
                      ? ", "
                      : ""
                  }`,
                      addressSecond: `${
                        address?.avenue
                          ? language == "ltr"
                            ? "Avenue"
                            : "جادة"
                          : ""
                      }
                   ${address?.avenue ? address?.avenue : ""}
                   ${address?.floor ? ", " : ""}

                  ${
                    address?.floor
                      ? language == "ltr"
                        ? "Floor No."
                        : "رقم الدور"
                      : ""
                  }
                    ${address?.floor ? address?.floor : ""}
                    ${address?.flat ? ", " : ""}
                  ${address?.flat ? flatLabel(address?.addressType) : ""}
                  ${address?.flat ? address?.flat : ""}`,
                      special_directions: address.special_directions,
                    }}
                    symbol={<ThreeDots />}
                    onEdit={() => {
                      updateAddress(address?.id);
                    }}
                    onDelete={() => deleteAddress(address?.id)}
                  />
                </div>
              </div>
            ))}

            {addressData?.length > 0 ? <Divider /> : null}

            <AddressCard
              icon={<Pointer />}
              info={{
                name:
                  language === "ltr"
                    ? "Deliver to new location"
                    : "تسليم إلى الموقع الجديد",
                desc:
                  language === "ltr"
                    ? "Add new address to deliver to."
                    : "أضف عنوانًا جديدًا للتوصيل إليه.",
              }}
              symbol={<RightArrow size={32} strokeWidth={1} />}
              cardClick={() => {
                handleAreaDetailsChange({
                  ...areaDetails,
                  area: "",
                  branch: "",
                  branch_id: "",
                  area_id: "",
                });
                handleAddressDetailsChange({
                  block: "",
                  street: "",
                  avenue: "",
                  house: "",
                  floor: "",
                  flat: "",
                  special_directions: "",
                  lat: 29.378,
                  lng: 47.99,
                  fixedLat: 29.378,
                  fixedLng: 47.99,
                  addressString: "",
                  addressType: "1",
                });
                router.push("/delivery-address");
              }}
              disableSymbolClick={true}
            />

            {/* <AddressCard
                icon={<LocationIcon />}
                info={{
                  name:
                    language === "ltr"
                      ? "Deliver to current location"
                      : "تسليم إلى الموقع الحالي",
                  desc:
                    language === "ltr"
                      ? "Choose this option to locate your place."
                      : "اختر هذا الخيار لتحديد مكانك.",
                }}
                cardClick={() => {
                  handleAreaDetailsChange({
                    ...areaDetails,
                    area: "",
                    branch: "",
                    branch_id: "",
                    area_id: "",
                  });
                  handleAddressDetailsChange({
                    block: "",
                    street: "",
                    avenue: "",
                    house: "",
                    floor: "",
                    flat: "",
                    special_directions: "",
                    lat: 29.378,
                    lng: 47.99,
                    fixedLat: 29.378,
                    fixedLng: 47.99,
                    addressString: "",
                    addressType: "1",
                  });
                  router.push("/delivery-address");
                }}
              /> */}
          </div>
        </div>
      </SwipeableDrawer>

      {loading && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "fixed",
            top: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "8",
          }}
          className="order-spinner-background"
        >
          <Spinner
            height="50px"
            color={homePageDetails?.vendor_data?.vendor_color}
            size="6px"
          />
        </div>
      )}
    </div>
  );
};

export default BottomDrawer;
