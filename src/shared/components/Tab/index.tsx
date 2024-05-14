import Link from 'next/link';
import Image from 'next/image';

import * as styles from '@/shared/components/Tab/styles.css';
import * as commonStyles from '@/shared/styles/common.css';

interface TabProps {
  pathname: string;
}

const NAV_LIST: {
  label: string;
  href: string;
  icon?: { src: string; alt: string; width: number; height: number };
}[] = [
  {
    label: 'Bar',
    href: '/bar-chart'
  },
  {
    label: 'Line',
    href: '/line-chart'
  },
  {
    label: 'Pie',
    href: '/pie-chart'
  },
  {
    label: 'Polygon',
    href: '/polygon-chart'
  }
];

export default function Tab({ pathname }: TabProps) {
  return (
    <nav>
      <h2 className={commonStyles.srOnly}>메뉴 탭</h2>
      <ul className={styles.navList}>
        {NAV_LIST.map((navItem) => (
          <li
            key={navItem.label}
            className={`${styles.navItem} ${navItem.href === pathname ? 'active' : ''}`}
          >
            {navItem.icon && (
              <Image
                src={navItem.icon.src}
                alt={navItem.icon.alt}
                width={navItem.icon.width}
                height={navItem.icon.height}
              />
            )}
            <Link href={navItem.href} className={styles.navItemText}>
              {navItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
