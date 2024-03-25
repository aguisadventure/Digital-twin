import { useEffect, useState } from 'react';
import axios from 'axios';

const ProducutData = () => {
  // 定义存储数据的状态
  const [mergedData, setMergedData] = useState([]);

  useEffect(() => {
    // 发送 GET 请求获取数据
    axios.get('http://localhost:8080/api/product')
      .then(productResponse => {
        // 获取 product 表数据
        const productData = productResponse.data;

        // 再发送请求获取 warehousing 表数据
        axios.get('http://localhost:8080/api/warehousing')
          .then(warehousingResponse => {
            // 获取 warehousing 表数据
            const warehousingData = warehousingResponse.data;

            // 再发送请求获取 outbound 表数据
            axios.get('http://localhost:8080/api/outbound')
              .then(outboundResponse => {
                // 获取 outbound 表数据
                const outboundData = outboundResponse.data;

                // 合并数据
                const mergedData = productData.map(productItem => {
                  const warehousingItem = warehousingData.find(item => item.warehousing_id === productItem.warehousing_id);
                  const outboundItem = outboundData.find(item => item.outbound_id === productItem.outbound_id);
                  return {
                    ...productItem,
                    ...warehousingItem,
                    ...outboundItem
                  };
                });

                // 设置数据状态
                setMergedData(mergedData);
              })
              .catch(error => {
                // 请求失败，输出错误信息
                console.error('获取 outbound 表数据失败：', error);
              });
          })
          .catch(error => {
            // 请求失败，输出错误信息
            console.error('获取 warehousing 表数据失败：', error);
          });
      })
      .catch(error => {
        // 请求失败，输出错误信息
        console.error('获取 product 表数据失败：', error);
      });
  }, []); // 第二个参数传入空数组，表示只在组件挂载时执行一次

  // 如果数据为空，可以显示加载中的提示
  if (mergedData.length === 0) {
    return <div>Loading...</div>;
  }

  return mergedData;

  //示例输出
  /* [
    {
      "warehousing_id": 1,
      "outbound_id": 101,
      "amount": 50,
      "location": "Location A",
      "destination": "Destination X"
    },
    {
      "warehousing_id": 2,
      "outbound_id": 102,
      "amount": 60,
      "location": "Location B",
      "destination": "Destination Y"
    },
    {
      "warehousing_id": 3,
      "outbound_id": 103,
      "amount": 70,
      "location": "Location C",
      "destination": "Destination Z"
    }
  ] */
  
};

export default ProducutData;
