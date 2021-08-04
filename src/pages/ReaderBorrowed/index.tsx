import type {FC} from 'react';
import {EllipsisOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Dropdown, Menu, Tag} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {Link} from 'umi';
import {useRef} from 'react';
import {bookStatusToStyleMap, bookStatusToTextMap} from '@/constant/book';
import useReaderBorrowedLogic from "@/pages/ReaderBorrowed/logic/useReaderBorrowedLogic";
import BorrowDateFormModal, {BorrowBookFormFieldMap} from "@/components/DateFormModal";

interface Props {

}

const BorrowBook: FC<Props> = () => {
    const {borrowBookService} = useReaderBorrowedLogic();
    const onFinish = async (id: number, formDate: BorrowBookFormFieldMap) => {
      await borrowBookService.updateService.run({ ...formDate,id, status: 'RENEWAL'});
    };
    const columns: ProColumns<API.BorrowBook>[] = [
      {dataIndex: 'id', title: '编号'},
      {dataIndex: 'book', title: '图书编号', render: (data) => <Link to={`/book/${data.id}`}>{data.id}</Link>},
      {dataIndex: 'book', title: '书名', render: (data) => <Link to={`/book/${data.id}`}>{data.name}</Link>},
      {title: '起始日期', dataIndex: 'startedDate'},
      {title: '结束日期', dataIndex: 'endDate'},
      {
        title: '状态', dataIndex: 'status', render: (text) => {
          return <Tag color={bookStatusToStyleMap[text]}>{bookStatusToTextMap[text]}</Tag>;
        }
      },
      {
        title: '操作', valueType: 'option', render: (data, record) => {
          console.log(record);
          return (<>
            {['APPLIED', 'RESERVED'].indexOf(record.status) !== -1 &&
            (<>
              <Button type="link" onClick={() => {
                borrowBookService.updateService.run({id: record.id, status: 'CANCELED'});
              }}>取消</Button>
            </>)}
            {['BORROWED', 'RENEWAL'].indexOf(record.status) !== -1  && (<>
              <Button type="link" onClick={() => {
                borrowBookService.updateService.run({id: record.id, status: "RETURNED"});
              }}>还书</Button>

              <BorrowDateFormModal onFinish={onFinish.bind(null, record.id)}
                                   occupiedTimeList={borrowBookService.occupiedTimeList}
                                   modalProps={{title:'填写续借信息'}}
                                   trigger={<Button type="link" onClick={() => {
                                     borrowBookService.getOccupiedTimeListService.run({id: record.book.id});
                                   }}>续借</Button>}/>

              <Button type="link" onClick={() => {
                borrowBookService.updateService.run({id: record.id, status: "LOST"});
              }}>遗失</Button>
            </>)}
          </>);
        }
      }
    ];
    const actionRef = useRef<ActionType>();
    const menu = (
      <Menu>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
      </Menu>
    );

    return (<div
      style={{
        background: '#F5F7FA'
      }}
    >
      <PageContainer
        header={{
          title: '我的借阅',
          ghost: true,
          breadcrumb: {
            routes: [
              {
                path: '/',
                breadcrumbName: '首页'
              },
              {
                path: '/book',
                breadcrumbName: '我的借阅'
              }
            ]
          },
        }}
        tabProps={{
          type: 'editable-card',
          hideAdd: true,
          onEdit: (e, action) => console.log(e, action)
        }}
      >
        <ProCard direction="column" ghost gutter={[0, 16]}>
          <ProCard>
            <ProTable<API.BorrowBook>
              loading={borrowBookService.loading}
              columns={columns}
              actionRef={actionRef}
              // request={async(params = {},sort,filter) => {
              //   return  queryGetBorrowBooks(params);
              // }}
              dataSource={borrowBookService.borrowBookList}
              rowKey="id"
              search={false}
              form={{
                // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下

                syncToUrl: (values, type) => {

                  if (type === 'get') {
                    return {
                      ...values,
                      created_at: [values.startTime, values.endTime]
                    };
                  }
                  return values;
                }
              }}
              pagination={{
                pageSize: 10
              }}
              dateFormatter="string"
              headerTitle="借阅列表"
            />
          </ProCard>
        </ProCard>
      </PageContainer>
    </div>);
  }
;

export default BorrowBook;
