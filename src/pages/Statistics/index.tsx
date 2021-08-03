import type {FC} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import styles from './index.less';
import DemoPie from '@/pages/Statistics/charts/Pie';
import useStatisticsLogic from './logic/useStatisticsLogic';
import {bookStatusToTextMap} from '@/constant/book';
import RankingList from '@/pages/Statistics/component/RankingList';
import {Column} from '@ant-design/charts';
import ProForm,{ProFormDateRangePicker,ProFormRadio} from '@ant-design/pro-form';
import moment from 'moment';
import {getStatisticsByTimeList} from '@/services/statistics';
import {Form,Radio,Space} from 'antd';
import {useForm} from 'antd/es/form/Form';

interface Props {

}


const Statistics: FC<Props> = (props) => {
    const {statisticsMap,getStatisticsService,statisticsByTimeList,getStatisticsByTimeListService,setFormData} = useStatisticsLogic();
    const [form] = useForm();
    const config = {
      data: statisticsByTimeList.map((item) => ({...item,status: bookStatusToTextMap[item.status],count: +item.count})),
      isGroup: true,
      xField: 'time',
      yField: 'count',
      seriesField: 'status',
      label: {
        position: 'middle',
        layout: [
          {type: 'interval-adjust-position'},
          {type: 'interval-hide-overlap'},
          {type: 'adjust-color'}
        ]
      }
    };
    return (<div
      style={{
        background: '#F5F7FA'
      }}
    >
      <PageContainer
        header={{
          title: '统计',
          ghost: true,
          breadcrumb: {
            routes: [
              {
                path: '/',
                breadcrumbName: '首页'
              },
              {
                path: '/statistics',
                breadcrumbName: '统计'
              }
            ]
          }
        }}
        tabProps={{
          type: 'editable-card',
          hideAdd: true,
          onEdit: (e,action) => console.log(e,action)
        }}
      >
        <ProCard>
          <div className={styles.gridContainer}>
            <div className={styles.rank1}>
              <RankingList list={statisticsMap.category} title='最受欢迎的图书类型 Top10'/>
            </div>
            <div className={styles.rank2}>
              <RankingList list={statisticsMap.book} title='最受欢迎的图书 Top10'/>
            </div>
            <div className={styles.chartPie}>
              <DemoPie
                data={statisticsMap.status.map((item) => ({value: +item.n,type: bookStatusToTextMap[item.status]}))}/>
            </div>
            <div className={styles.rank3}>
              <RankingList list={statisticsMap.reader} title='最活跃的读者 Top10'/>
            </div>
            <div className={styles.chartPillar}>
              <ProForm
                submitter={false}
                layout="inline"
                form={form}
                onValuesChange={(changeValues) => {
                  setFormData(formData => ({
                    ...formData,
                    ...changeValues
                  }));
                }}>
                <ProFormDateRangePicker name='timeQuantum' label='选择日期范围'
                                        fieldProps={{defaultValue: [moment(Date.now()).startOf('year'),moment(Date.now()).endOf('year')]}}/>
                <ProFormRadio.Group label="时间单位" name='timeUnit' fieldProps={{defaultValue: 'day'}}
                                    options={[{label: '月',value: 'month'},{label: '日',value: 'day'}]}/>
              </ProForm>
              <br/>
              <Column {...config} />
            </div>
          </div>
        </ProCard>
      </PageContainer>
    </div>);
  }
;

export default Statistics;
