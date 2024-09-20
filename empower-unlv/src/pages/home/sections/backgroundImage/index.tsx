export default function BackgroundImage() {
  return (
    <div className="w-full h-[100vh] overflow-hidden fixed z-[-1]">
      <img className="inset-0 w-full h-full object-top object-cover" src="src/assets/hero-bg.jpg" />
    </div>
  );
}
