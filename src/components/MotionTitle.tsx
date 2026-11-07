export default function MotionTitle({ children }: { children: string }) {
  return <>
    <span className="sr-only">{children}</span>
    <span aria-hidden="true">
      {children.split(" ").map((word, index) => <span key={`${word}-${index}`}>
        {index > 0 && " "}
        <span className="motion-word-window"><span data-motion-word>{word}</span></span>
      </span>)}
    </span>
  </>;
}
