export type SvgIconProps = {
    className?: string;
    color?: string;
  };
  
  export const TikTokIcon = ({ className, color }: SvgIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            viewBox="0
            0 448 512"
            className={className}
            fill={color}
        >
            <path d="M224 512c-123.71 0-224-100.29-224-224 0-123.71 100.29-224 224-224 123.71 0 224 100.29 224 224 0 123.71-100.29 224-224 224zm0-384c-70.69 0-128 57.31-128 128s57.31 128 128 128 128-57.31 128-128-57.31-128-128-128zm0 256c-35.35 0-64-28.65-64-64s28.65-64 64-64 64 28.65 64 64-28.65 64-64 64z" />
        </svg>
    );
  };
  