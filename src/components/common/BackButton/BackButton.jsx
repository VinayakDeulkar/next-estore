import HeadLine from "@/components/assetBoxDesign/Headline/headLine";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./backButton.module.css";

const BackButton = ({ clickButton, arabic_title, english_title, variant }) => {
  const router = useRouter();

  return (
    <Box className={styles.commonbackMainBox}>
      <Box
        className={styles.commonbackHolder}
        onClick={() => (clickButton ? clickButton() : router.back())}
      >
        <Box>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
          >
            <path
              d="M8 15L1 8L8 1"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
      </Box>
      {arabic_title != "" && english_title != "" ? (
        <HeadLine arText={arabic_title} enText={english_title} />
      ) : null}
    </Box>
  );
};

export default BackButton;
