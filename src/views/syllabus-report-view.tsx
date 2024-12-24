import { useEffect, useState } from 'react';
import { ISyllabusReportInfo } from '../entities/syllabus/types';
import { Descriptions, Space, Table, Typography } from 'antd';
import { appDictionary } from '../shared/dictionary';
import { ruStudyTypes } from '../shared/studyTypes';
import { usePDF } from 'react-to-pdf';

interface IProps {
  item: ISyllabusReportInfo | null;
  className: string;
  onExport: () => void;
}

const desriptionsKeys: (keyof ISyllabusReportInfo)[] = [
  'aims',
  'requirements',
  'competencies',
  'position_in_scheme',
  'themes',
  'contents',
];

export function SyllabusReportView({ item, className, onExport }: IProps) {
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
  const [items, setItems] = useState<any[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (item) {
      setItems(() =>
        desriptionsKeys.map((key) => ({
          key,
          label: appDictionary[key as keyof typeof appDictionary],
          children: item?.[key],
        })),
      );
      if (!item.loads.length) {
        setReady(() => true);
      }
    } else {
      setItems(() => []);
      setReady(() => false);
    }
  }, [item]);

  useEffect(() => {
    if (items.length) setReady(() => true);
  }, [items]);

  useEffect(() => {
    if (ready) {
      toPDF({ filename: 'Учебная программа.pdf' });
      onExport();
    }
    // eslint-disable-next-line
  }, [ready]);

  return (
    <div className={className}>
      <Space ref={targetRef} direction={'vertical'} style={{ padding: 12 }}>
        <Typography.Title>
          Учебная программа {item?.name.toLowerCase()}{' '}
          <span style={{ color: 'grey' }}>
            {item?.year} - {(item?.year ?? 0) + 1}
          </span>
        </Typography.Title>

        <Descriptions bordered layout={'vertical'} items={items as any} column={2} />

        <Table
          rowKey={'key'}
          columns={Object.keys(item?.loads?.[0] ?? {}).map((key) => {
            return {
              key,
              title:
                appDictionary[key as keyof typeof appDictionary] +
                (key === 'total_hours'
                  ? ` (${item?.loads.reduce((state, current) => {
                      return state + current.total_hours;
                    }, 0)})`
                  : ''),
              render: (value) =>
                key === 'type'
                  ? ruStudyTypes[value[key] as keyof typeof ruStudyTypes]
                  : value[key],
            };
          })}
          dataSource={item?.loads ? item.loads.map((l, i) => ({ ...l, key: i })) : []}
          pagination={false}
        />
      </Space>
    </div>
  );
}
