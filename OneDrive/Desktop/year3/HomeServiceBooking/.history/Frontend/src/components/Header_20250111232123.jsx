import Image from 'next/image';

function Header() {
  return (
    <div>
      <Image src='/logo.png' alt='logo' width={180} height={100} />
    </div>
  );
}

export default Header;
