import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: any;
  // rate: string;
  // levelUp?: boolean;
  // levelDown?: boolean;
  children: ReactNode;
  link: any
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  // rate,
  // levelUp,
  // levelDown,
  children,
  link
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md2 font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>

        <a href={link}
          className={`flex items-center gap-1 text-sm font-medium text-meta-5 bg-green-100 py-2 px-5 rounded-md text-nowrap`}
        >
          Lihat Detail
        </a>
      </div>
    </div>
  );
};

export default CardDataStats;
