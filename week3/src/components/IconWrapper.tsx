import { ReactNode } from "react";

// Svg 코드를 감싸 React 컴포넌트로 사용할 수 있게 해주는 IconWrapper 컴포넌트입니다.
interface IconWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function IconWrapper({
  children,
  className = "size-6",
}: IconWrapperProps) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

// 사용예시
{
  /* 
  <IconWrapper size="w-10 h-10" className="text-blue-500">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-full h-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
</IconWrapper>; 
*/
}
