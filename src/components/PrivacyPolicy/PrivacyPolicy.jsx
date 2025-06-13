import { AppContext } from "@/context/AppContext";
import { Box, Dialog, IconButton } from "@mui/material";
import React, { useContext } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { motion } from "framer-motion";
import SubHeadline from "../assetBoxDesign/SubHeadline/subHeadline";

const PrivacyPolicy = ({ isOpen, handleClose }) => {
  const { language } = useContext(AppContext);
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      sx={{
        "& .MuiDialog-container > .MuiPaper-root": {
          borderRadius: "16px", // Change this value as needed
          minWidth: "340px",
          margin: "15px",
          overflow: "hidden",
        },
        "& .MuiDialog-container": {
          justifyContent: window.innerWidth < 991 ? "center" : "flex-start",
        },
      }}
    >
      <Box
        sx={{
          height: "calc(100dvh - 50px)",
          padding: "20px",
          width: window.innerWidth > 990 ? "500px" : "auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            "& .MuiIconButton-root": {
              padding: 0,
            },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: "20px" }}
            animate={{ opacity: 1, y: "0px" }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <IconButton onClick={handleClose}>
              <ClearIcon
                sx={{
                  fill: "#000",
                }}
              />
            </IconButton>
          </motion.div>
        </Box>
        <motion.div
          initial={{ opacity: 0, y: "20px" }}
          animate={{ opacity: 1, y: "0px" }}
          transition={{ duration: 0.2, delay: 0.4 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "-5px",
            }}
          >
            <SubHeadline
              enText={"Payzah Privacy Policy"}
              arText={"سياسة الخصوصية لبايزاه"}
              fontSize={"18px"}
            />
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: "20px" }}
          animate={{ opacity: 1, y: "0px" }}
          transition={{ duration: 0.2, delay: 0.6 }}
        >
          {language === "ltr" ? (
            <div class="mailbox-read-message">
              <p>
                Privacy Policy for Payzah Services Last Updated: [18th of
                December 2024]
              </p>

              <p>1. Introduction</p>

              <p>
                Welcome to Payzah Payments Services, a comprehensive fintech
                solution provided by Payzah.com. We are committed to protecting
                your privacy and ensuring the security of your personal
                information. This Privacy Policy explains how we collect, use,
                and safeguard your information when you use our services, which
                include Payment Links, Weblink, e-Store, Booking, and Gateway.
              </p>

              <p>2. Information We Collect</p>

              <p>
                We collect various types of information to provide and improve
                our services:
              </p>

              <p>
                - Personal Information: Includes your name, email address, phone
                number, and payment details. - Transactional Information:
                Details of transactions carried out through our services. -
                Technical Information: IP address, browser type, device
                information, and other technical data.
              </p>

              <p>3. How We Use Your Information</p>

              <p>We use the information we collect to:</p>

              <p>
                - Provide, operate, and maintain our services. - Process
                transactions and send notifications regarding your transactions.
                - Improve and customize our services to better serve you. -
                Communicate with you about updates, promotions, and other
                relevant information. - Ensure security and prevent fraudulent
                activities.
              </p>

              <p>4. Sharing Your Information</p>

              <p>
                We do not sell or rent your personal information to third
                parties. However, we may share your information in the following
                circumstances:
              </p>

              <p>
                - With service providers who assist us in operating our
                services. - To comply with legal obligations or respond to
                lawful requests by public authorities. - To protect the rights,
                property, or safety of Payzah Services, our users, or the
                public.
              </p>

              <p>5. Data Security</p>

              <p>
                We implement a variety of security measures to maintain the
                safety of your personal information. Your data is stored using
                SSL encryption and other advanced technologies. However, no
                method of transmission over the Internet or electronic storage
                is completely secure, and we cannot guarantee absolute security.
              </p>

              <p>6. Cookies and Tracking Technologies</p>

              <p>
                We use cookies and similar tracking technologies to enhance your
                experience on our platform. Cookies help us understand how you
                use our services and improve them accordingly. You can control
                the use of cookies through your browser settings.
              </p>

              <p>7. Your Rights</p>

              <p>
                You have the right to object to the processing of your personal
                data.
              </p>

              <p>
                To exercise any of these rights, please contact us at
                info@payzah.com
              </p>

              <p>8. Third-Party Links</p>

              <p>
                Our services may contain links to third-party websites. We are
                not responsible for the privacy practices of these sites. We
                encourage you to read their privacy policies.
              </p>

              <p>9. Changes to This Privacy Policy</p>

              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new policy on our
                website and updating the &quot;Last Updated&quot; date. Your
                continued use of our services after such changes indicates your
                acceptance of the new policy.
              </p>

              <p>10. Contact Us</p>

              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>

              <p>
                - Email: info@payzah.com - Address: Kuwait City, Dar Alawadi
                Mall, Floor 1, Payzah Office Payzah Payments Systems W.L.L.C
                +965 565 00733
              </p>
            </div>
          ) : (
            <div class="mailbox-read-message" style={{ fontSize: "18px" }}>
              <p>
                <span>
                  <span>
                    **سياسة الخصوصية لخدمات شركة بيزة للمدفوعات** &nbsp; تاريخ
                    التحديث: [18&nbsp;ديسمبر&nbsp;2024&nbsp;]
                  </span>
                </span>
              </p>

              <p>
                <span>
                  <span>1. **مقدمة**</span>
                </span>
              </p>

              <p>
                <span>
                  <span>
                    <span dir="RTL">
                      مرحبًا بك في خدمات بيزة للمدفوعات، الحل المالي الشامل
                      المقدم من شركة بيزة لأعمال نظم الدفع &nbsp;والتسويات
                      الإلكترونية. نحن ملتزمون بحماية خصوصيتك وضمان أمان
                      معلوماتك الشخصية. تشرح سياسة الخصوصية هذه كيف نقوم بجمع
                      واستخدام وحماية معلوماتك عندما تستخدم خدماتنا، والتي تشمل
                      روابط الدفع، روابط الويب، المتاجر الإلكترونية، الحجز،
                      وبوابة الدفع
                    </span>
                    .
                  </span>
                </span>
              </p>

              <p>
                <span>
                  <span>2. **المعلومات التي نقوم بجمعها**</span>
                </span>
              </p>

              <p>
                <span>
                  <span>
                    <span dir="RTL">
                      نقوم بجمع أنواع مختلفة من المعلومات لتقديم وتحسين خدماتنا
                    </span>
                    :
                  </span>
                </span>
              </p>

              <p>
                <span>
                  <span>
                    - **المعلومات الشخصية**: تشمل اسمك، عنوان بريدك الإلكتروني،
                    رقم هاتفك، وتفاصيل الدفع. - **المعلومات المعاملاتية**:
                    تفاصيل المعاملات التي تمت عبر خدماتنا. - **المعلومات
                    التقنية**: عنوان&nbsp;IP، نوع المتصفح، معلومات الجهاز،
                    وبيانات تقنية أخرى.
                  </span>
                </span>
              </p>

              <p>
                <span>
                  <span>3. **كيفية استخدام معلوماتك**</span>
                </span>
              </p>

              <p>
                <span>
                  <span>
                    <span dir="RTL">نستخدم المعلومات التي نقوم بجمعها لـ</span>:
                  </span>
                </span>
              </p>

              <p>
                <span>
                  <span>
                    -&nbsp;تقديم وتشغيل وصيانة خدماتنا. -&nbsp;معالجة المعاملات
                    وإرسال إشعارات بشأن معاملتك. -&nbsp;تحسين وتخصيص خدماتنا
                    لخدمتك بشكل أفضل. -&nbsp;التواصل معك بشأن التحديثات،
                    الترويجات، والمعلومات ذات الصلة. -&nbsp;ضمان الأمان ومنع
                    الأنشطة الاحتيالية.
                  </span>
                </span>
              </p>

              <p>
                <span>
                  <span>4. **مشاركة معلوماتك**</span>
                </span>
              </p>

              <p>
                <span>
                  <span>
                    <span dir="RTL">
                      نحن لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. ومع
                      ذلك، قد نشارك معلوماتك في الحالات التالية
                    </span>
                    :
                  </span>
                </span>
              </p>

              <p>
                <span>
                  <span>
                    -&nbsp;مع مقدمي الخدمات الذين يساعدوننا في تشغيل خدماتنا.
                    -&nbsp;للامتثال للالتزامات القانونية أو الاستجابة لطلبات
                    قانونية من السلطات العامة. -&nbsp;لحماية حقوق، ممتلكات، أو
                    سلامة خدمات بيزة، مستخدمينا، أو الجمهور.
                  </span>
                </span>
              </p>

              <p>
                <span>
                  <span>5. **أمان البيانات**</span>
                </span>
              </p>

              <p>
                <span>
                  <span>
                    <span dir="RTL">
                      نقوم بتنفيذ مجموعة متنوعة من التدابير الأمنية للحفاظ على
                      سلامة معلوماتك الشخصية. يتم تخزين بياناتك باستخدام تشفير
                    </span>
                    &nbsp;SSL&nbsp;وتكنولوجيا متقدمة أخرى. ومع ذلك، لا توجد
                    طريقة نقل عبر الإنترنت أو تخزين إلكتروني مضمونة تمامًا، ولا
                    يمكننا ضمان الأمان المطلق.
                  </span>
                </span>
              </p>

              <p>
                <span>
                  <span>6. **الكوكيز وتقنيات التتبع**</span>
                </span>
              </p>

              <p>
                <span>
                  <span>
                    <span dir="RTL">
                      نستخدم الكوكيز وتقنيات التتبع المماثلة لتعزيز تجربتك على
                      منصتنا. تساعدنا الكوكيز على فهم كيفية استخدامك لخدماتنا
                      وتحسينها وفقًا لذلك. يمكنك التحكم في استخدام الكوكيز من
                      خلال إعدادات متصفحك
                    </span>
                    .
                  </span>
                </span>
              </p>

              <p>
                <span>
                  <span>7. **حقوقك**</span>
                </span>
              </p>

              <p>
                <span>
                  <span>
                    <span dir="RTL">
                      لديك الحق في الاعتراض على معالجة بياناتك الشخصية
                    </span>
                    .
                  </span>
                </span>
              </p>

              <p>
                <span>
                  <span>
                    <span dir="RTL">
                      للقيام بأي من هذه الحقوق، يرجى الاتصال بنا على
                    </span>
                    &nbsp;info@payzah.com
                  </span>
                </span>
              </p>

              <p>
                <span>
                  <span>8. **روابط الأطراف الثالثة**</span>
                </span>
              </p>

              <p>
                <span>
                  <span>
                    <span dir="RTL">
                      قد تحتوي خدماتنا على روابط لمواقع إلكترونية تابعة لأطراف
                      ثالثة. نحن غير مسؤولين عن ممارسات الخصوصية لهذه المواقع.
                      نشجعك على قراءة سياسات الخصوصية الخاصة بها
                    </span>
                    .
                  </span>
                </span>
              </p>

              <p>
                <span>
                  <span>9. **التعديلات على سياسة الخصوصية هذه**</span>
                </span>
              </p>

              <p>
                <span>
                  <span>
                    <span dir="RTL">
                      قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي
                      تغييرات من خلال نشر السياسة الجديدة على موقعنا الإلكتروني
                      وتحديث تاريخ &quot;تاريخ التحديث&quot;. استمرارك في
                      استخدام خدماتنا بعد هذه التغييرات يشير إلى قبولك للسياسة
                      الجديدة
                    </span>
                    .
                  </span>
                </span>
              </p>

              <p>
                <span>
                  <span>10. **اتصل بنا**</span>
                </span>
              </p>

              <p>
                <span>
                  <span>
                    <span dir="RTL">
                      إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال
                      بنا على
                    </span>
                    :
                  </span>
                </span>
              </p>

              <p>
                <span>
                  <span>
                    -&nbsp;البريد الإلكتروني: info@payzah.com -&nbsp;العنوان:
                    مدينة الكويت, شرق, مجمع دار العوضي, الدور الأول, شركة بيزة
                    لأنظمة الدفع و التسويات الإلكترونية. &nbsp; شركة بيزة لإنظمة
                    الدفع و التسويات الإلكترونية ذ.م.م &nbsp;+965 565 00733
                  </span>
                </span>
              </p>

              <p>&nbsp;</p>
            </div>
          )}
        </motion.div>
      </Box>
    </Dialog>
  );
};

export default PrivacyPolicy;
