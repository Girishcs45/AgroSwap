import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({
  children,
  onClick,
  variantType = "primary",
  size = "medium",
  startIcon,
  endIcon,
  fullWidth = false,
  disabled = false,
  sx = {},
}) => {
  const variants = {
    primary: {
      background: "linear-gradient(135deg, #6366f1, #4f46e5)",
      color: "#fff",
      "&:hover": {
        background: "linear-gradient(135deg, #4f46e5, #4338ca)",
      },
      boxShadow: "0 6px 18px rgba(99,102,241,0.25)",
    },

    success: {
      background: "linear-gradient(135deg, #10b981, #059669)",
      color: "#fff",
      "&:hover": {
        background: "linear-gradient(135deg, #059669, #047857)",
      },
      boxShadow: "0 6px 18px rgba(16,185,129,0.25)",
    },

    outline: {
      background: "transparent",
      color: "#4f46e5",
      border: "1px solid #6366f1",
      "&:hover": {
        background: "rgba(99,102,241,0.08)",
      },
    },

    danger: {
      background: "linear-gradient(135deg, #ef4444, #dc2626)",
      color: "#fff",
      "&:hover": {
        background: "linear-gradient(135deg, #dc2626, #b91c1c)",
      },
      boxShadow: "0 6px 18px rgba(239,68,68,0.25)",
    },
  };

  const sizes = {
    small: {
      fontSize: "0.8rem",
      padding: "6px 14px",
      minHeight: "32px",
      borderRadius: "8px",
    },
    medium: {
      fontSize: "0.9rem",
      padding: "8px 18px",
      minHeight: "36px",
      borderRadius: "10px",
    },
    large: {
      fontSize: "1rem",
      padding: "12px 26px",
      minHeight: "44px",
      borderRadius: "14px",
    },
  };

  const selectedVariant = variants[variantType] || variants.primary;
  const selectedSize = sizes[size] || sizes.medium;

  return (
    <Button
      variant="contained"
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      disabled={disabled}
      sx={{
        textTransform: "none",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: "6px",
        transition: "all 0.25s ease",
        ...selectedVariant,
        ...selectedSize,

        "&:hover": {
          transform: "translateY(-1px)",
          ...(selectedVariant["&:hover"] || {}),
        },

        "&:active": {
          transform: "scale(0.97)",
        },

        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;