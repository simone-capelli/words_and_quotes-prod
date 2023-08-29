'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const BottomBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {pathname === '/' && (
          <>
            <a href="#contactMe">
              <Image
                src="/assets/bottombar/contactMe.png"
                alt="ContactMe"
                width={30}
                height={30}
                className="cursor-pointer"
              />
            </a>

            <Image
              onClick={() => router.push('/')}
              src="/assets/bottombar/home-green.png"
              alt="Home_green"
              width={36}
              height={36}
            />

            <Image
              onClick={() => router.push('/words')}
              src="/assets/bottombar/plus-fill.png"
              alt="Add_fill"
              width={28}
              height={28}
              className="cursor-pointer"
            />
          </>
        )}

        {(pathname === '/words' || pathname === '/words/storage') && (
          <>
            <Image
              onClick={() => router.push('/')}
              src="/assets/bottombar/home-fill.png"
              alt="Home_fill"
              width={28}
              height={28}
              className="cursor-pointer"
            />
            {pathname === '/words' && (
              <>
                <Image
                  src="/assets/bottombar/plus-green.png"
                  alt="Add_green"
                  width={35}
                  height={35}
                />
                <Image
                  onClick={() => router.push('/words/storage')}
                  src="/assets/bottombar/folder-fill.png"
                  alt="Folder_fill"
                  width={28}
                  height={28}
                  className="cursor-pointer"
                />
              </>
            )}
            {pathname === '/words/storage' && (
              <>
                <Image
                  onClick={() => router.push('/words/storage')}
                  src="/assets/bottombar/folder-green.png"
                  alt="Folder_green"
                  width={35}
                  height={35}
                />
                <Image
                  onClick={() => router.push('/words')}
                  src="/assets/bottombar/plus-fill.png"
                  alt="Add_fill"
                  width={28}
                  height={28}
                  className="cursor-pointer"
                />
              </>
            )}
          </>
        )}

        {/* <a
          href="https://t.me/Words_and_Quotes"
          className="mt-3 cta-btn bg-[#000]"
        >
          <button className="flex flex-row cta-title text-[30px] gap-3 items-center">
            <Image
              src="/assets/homepage/telegram.png"
              alt="Telegram"
              width={20}
              height={20}
            />{' '}
            Entra su Telegram
          </button>
        </a> */}
      </div>
    </section>
  );
};

export default BottomBar;
