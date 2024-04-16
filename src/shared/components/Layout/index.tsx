import { PropsWithChildren } from 'react';
import { headers } from 'next/headers';

import Tab from '@/shared/components/Tab';
import * as styles from '@/shared/components/Layout/style.css';
import * as commonStyles from '@/shared/styles/common.css';

interface LayoutProps {
  title: string;
}

export default function Layout({ title, children }: PropsWithChildren<LayoutProps>) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';

  return (
    <section className={styles.area}>
      <h1 className={commonStyles.srOnly}>{title}</h1>
      <Tab pathname={pathname} />
      <div className={styles.content}>
        <h2 className={commonStyles.srOnly}>차트 영역</h2>
        {children}
      </div>
    </section>
  );
}
