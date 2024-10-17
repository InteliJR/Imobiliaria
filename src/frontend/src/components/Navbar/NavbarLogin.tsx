export default function Navbar() {
  return (
    <div>
      <div className="bg-neutral-black flex justify-between items-center px-4 py-4 min-h-20"> {/* Added min-h-16 */}
        <div>
          <img src="/Logo.svg" alt="Logo" />
        </div>
      </div>
    </div>
  );
}
