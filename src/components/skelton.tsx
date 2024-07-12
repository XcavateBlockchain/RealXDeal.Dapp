export default function Skeleton({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-[#3B4F7480]/[0.50] ease-in-out ${className}`}
    />
  );
}
