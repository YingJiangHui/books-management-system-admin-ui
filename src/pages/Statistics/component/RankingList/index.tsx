import React,{FC,HTMLAttributes,PropsWithChildren} from 'react'
import ProList from '@ant-design/pro-list';
import styles from './index.less'

const defaultProps = {}

type Props = {
  list: [],
  title: string
}

type RankingListProps = typeof defaultProps & Props & HTMLAttributes<any>

const RankingList: FC<PropsWithChildren<Props>> = ({list,title,...rest})=>{

    return (
      <ProList<any>
        rowKey="id"
        headerTitle={title}
        tooltip={title}
        dataSource={list}
        showActions="hover"
        showExtra="hover"
        rowClassName={styles.row}
        metas={{
          title: {
            dataIndex: 'name',
            render:(data,record,index)=>{
              return <div><span className={styles[`serialNumber${index+1}`]}>{index+1}</span>  {data}</div>
            }
          },
          description: {
            dataIndex: 'desc',
          },
        }}
      />
    )
}

export default RankingList
