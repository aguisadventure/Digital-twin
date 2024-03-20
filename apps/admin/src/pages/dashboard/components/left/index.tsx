import { LeftOutlined, RightOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useSpring, animated } from 'react-spring';
import { useState } from 'react';
import styles from '../style.module.scss';

import Panel from '@/components/Panel';

import Buffer from './modules/Buffer';
import Task from './modules/Task';
import TobaccoPanel from './modules/TobaccoPanel';
import { Modal } from 'antd';
import AccessoryPanel from './modules/AccessoryPanel';

const Left = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  // 定义动画属性
  const containerAnimation = useSpring({
    // width: isExpanded ? '280px' : '0px',
    transform: isExpanded ? 'translate(0%)' : 'translateX(-100%)',
    // padding: isExpanded ? '16px' : '0px',
    // borderWidth: isExpanded ? '1px' : '0px',
    config: { precision: 0.01 },
  });

  // 切换容器状态
  const toggleContainer = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div>
      <animated.div
        style={{
          ...containerAnimation,
        }}
        className={`absolute top-2 left-2 bottom-2 w-[280px] ${styles.panel}`}
      >
        <div className="h-full overflow-auto">
          <Panel title="库房情况">
            <Buffer />
          </Panel>
          <Panel 
            title="原料入库信息"
            right={
              <span className="hover:scale-120 transition-transform duration-300 ">
                <UnorderedListOutlined
                    onClick={() => {
                      setOpen2(true);
                    }}
                />
              </span>
            }
          >
            <Task />
          </Panel>
          <Panel 
            title="辅料入库信息"
            right={
              <span className="hover:scale-120 transition-transform duration-300 ">
                <UnorderedListOutlined
                    onClick={() => {
                      setOpen(true);
                    }}
                />
              </span>
            }
          >
            <AccessoryPanel />
          </Panel>
        </div>
        <div
          className={`${'absolute text-white top-1/2 -translate-y-1/2 right-[-21px] bg-black bg-opacity-20 text-xl font-bold bg'}`}
        >
          {isExpanded ? (
            <LeftOutlined
              className="hover:scale-110 transition-transform duration-300 "
              onClick={toggleContainer}
            />
          ) : (
            <RightOutlined
              className="hover:scale-110 transition-transform duration-300"
              onClick={toggleContainer}
            />
          )}
        </div>
      </animated.div>

      <Modal
          title="辅料入库信息"
          centered
          open={open}
          // mask={false}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          <AccessoryPanel />

      </Modal>
      <Modal
          title="原料入库信息"
          centered
          open={open2}
          // mask={false}
          onOk={() => setOpen2(false)}
          onCancel={() => setOpen2(false)}
        >
          <TobaccoPanel />

      </Modal>
    </div>
  );
};

export default Left;
