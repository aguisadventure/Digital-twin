//仓库存储空间使用情况

import { useEffect, useState } from 'react';
import axios from 'axios';

const StorageData = () => {
  // 定义存储数据的状态
  const [storageData, setStorageData] = useState([]);

  useEffect(() => {
    // 发送 GET 请求获取数据
    const tobaccoPromise = axios.get('http://localhost:8080/dashboard/storage_chart/raw_tobacco', {
        params: {
            columns: ['warehousing_id', 'amount'] // 指定要返回的列
        }
    });

    const accessoriesPromise = axios.get('http://localhost:8080/dashboard/storage_chart/raw_accessories', {
      params: {
        columns: ['type', 'warehousing_id', 'amount'] 
      }
    });

    const productPromise = axios.get('http://localhost:8080/dashboard/storage_chart/product', {
      params: {
        columns: ['warehousing_id', 'outbound_id', 'accessories_id', 'tobacco_id', 'product_date', 'amount'] 
      }
    });

    const packagePromise = axios.get('http://localhost:8080/dashboard/storage_chart/package', {
      params: {
        columns: ['warehousing_id', 'outbound_id', 'accessories_id', 'tobacco_id', 'product_date', 'amount'] 
      }
    });

    const warehousingPromise = axios.get('http://localhost:8080/dashboard/storgae_chart/warehousing', {
      params: {
        columns: ['id', 'storage_time'] 
      }
    });

    const outboundPromise = axios.get('http://localhost:8080/dashboard/storgae_chart/outbound', {
      params: {
        columns: ['id', 'outbound_time'] 
      }
    });

    // 并行发送请求
    Promise.all([tobaccoPromise, accessoriesPromise, productPromise, packagePromise, warehousingPromise, outboundPromise])
      .then(([tobaccoResponse, accessoriesResponse, productResponse, packageResponse, warehousingResponse, outboundResponse]) => {

        const tobaccoData = tobaccoResponse.data;
        const accessoriesData = accessoriesResponse.data;
        const productData = productResponse.data;
        const packageData = packageResponse.data;
        const warehousingData = warehousingResponse.data;
        const outboundData = outboundResponse.data;
        
        // 合并两个数据数组
        const tobaccoWarehousingData = mergeData1(tobaccoData, warehousingData);
        const accessoriesWarehousingData = mergeData2(accessoriesData, warehousingData);
        const productWarehousingData = mergeData3(productData, warehousingData, outboundData);
        const packageWarehousingData = mergeData4(packageData, warehousingData, outboundData);

        
        // 设置数据状态
        setConsumeData(consumeData);
      })
      .catch(error => {
        // 请求失败，输出错误信息
        console.error('获取数据失败：', error);
      });
  }, []); // 第二个参数传入空数组，表示只在组件挂载时执行一次

  // 如果数据为空，可以显示加载中的提示
  if (consumeData.length === 0) {
    return <div>Loading...</div>;
  }

  return consumeData;
};

// 合并两个数据数组的函数
const mergeData = (tobaccoData, accessoriesData, productData) => {
    // 实现合并逻辑，这里假设 warehousingData 和 outboundData 都是数组，格式相同
    // 合并逻辑可以根据实际需求进行编写，比如根据 warehousing_id 和 outbound_id 进行匹配合并等
    // 这里简单示范一个合并方法
    const mergedData = productData.map(productItem => {
      const accessoriesItem = accessoriesData.find(item => item.accessories_id === productItem.accessories_id);
      const tobaccoItem = tobaccoData.find(item => item.tobacco_id === productItem.tobacco_id);

      if (accessoriesItem && tobaccoItem) {
        // 合并逻辑示例：将两个表格的数据合并为一个对象
        return {
            date: productItem.product_date,
            tobacco_id: productItem.tobacco_id,
            tobacco_amount: tobaccoItem.amount,
            accessories_id: productItem.accessories_id,
            accessories_amount: accessoriesItem.accessories_id,
        };
      } else {
        // 如果找不到对应的 outbound 数据，可能需要进行处理，这里示例返回一个空对象
        return {};
      }
    });
  
    return mergedData;
  };

export default ConsumeData;
