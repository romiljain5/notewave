import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton, Button } from 'antd';
import { DeleteOutlined, EditFilled, CheckOutlined } from '@ant-design/icons';
import axios from 'axios';

const TasksList = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const loadMoreData = async () => {
      if (loading) {
        return;
      }
      setLoading(true);

      try {
          const tasksData = await axios.get(`http://localhost:8080/get-all-tasks?token=${import.meta.env.VITE_REACT_APP_TOKEN}`);
          setData([...data,...tasksData.data]);
          setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }

    //   fetch(`http://localhost:8080/get-all-tasks?token=${import.meta.env.VITE_REACT_APP_TOKEN}`)
    //     .then((res) => res.json())
    //     .then((body) => {
    //       setData([...data, ...body.results]);
    //       setLoading(false);
    //     })
    //     .catch(() => {
    //       setLoading(false);
    //     });

    };

    useEffect(() => {
      loadMoreData();
      console.log("Fetched data", data)
    }, []);
    return (
      <div
        id="scrollableDiv"
        style={{
          height: '70vh',
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.description}>
                <List.Item.Meta
                //   avatar={<Avatar src={item.picture.large} />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={item.description}
                />
                <div>
                    {/* when checked move to done state, when delete delete from db */}
                <Button type="primary" style={{backgroundColor:"#52c41a"}} icon={<CheckOutlined />} size={'large'}/>
                <Button type="primary" style={{margin:"0 10px"}} icon={<EditFilled />} size={'large'}/>
                <Button type="primary" icon={<DeleteOutlined />} size={'large'} danger/>

                </div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
  );
};
export default TasksList;
