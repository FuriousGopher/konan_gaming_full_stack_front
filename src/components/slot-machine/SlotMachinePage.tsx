import { useEffect, useState } from 'react';
import { getUserinfo, spinSlotMachine } from '../../apis/api.ts';
import { UserInfo } from '../../models/UserModel.ts';
import { Button } from '@mui/material';
import { SpinResultModel } from '../../models/SpinResultModel.ts';

export const SlotMachinePage = () => {
  const [userinfo, setUserInfo] = useState<UserInfo>();
  const [spinResult, setSpinResult] = useState<SpinResultModel>();

  const fetchUserInfo = async () => {
    try {
      const userInfo = await getUserinfo();
      setUserInfo(userInfo);
    } catch (e) {
      console.error(e);
    }
  };

  const makeSpin = async () => {
    try {
      const spinResult = await spinSlotMachine();
      setSpinResult(spinResult);
      fetchUserInfo();
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div>
      <h1>Slot Machine Page</h1>
      <h2>{userinfo?.userName}</h2>
      <h2>{userinfo?.coins}</h2>
      <h2>{spinResult?.result1}</h2>
      <h2>{spinResult?.result2}</h2>
      <h2>{spinResult?.result3}</h2>
      <h3>{spinResult?.yourWin}</h3>
      <Button onClick={makeSpin}>Spin</Button>
    </div>
  );
};

export default SlotMachinePage;
