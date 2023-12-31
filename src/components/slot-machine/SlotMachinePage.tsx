import { useEffect, useState } from 'react';
import { getUserinfo, spinSlotMachine } from '../../apis/api.ts';
import { UserInfo } from '../../models/UserModel.ts';
import { Alert, Button, Card, CardContent, Typography } from '@mui/material';
import { SpinResultModel } from '../../models/SpinResultModel.ts';
import './SlotMachinePage.css';
import { Link } from 'react-router-dom';

export const SlotMachinePage = () => {
  const [userinfo, setUserInfo] = useState<UserInfo>();
  const [error, setError] = useState<string[]>([]);
  const [spinResult, setSpinResult] = useState<SpinResultModel>();

  const fetchUserInfo = async () => {
    try {
      const userInfo = await getUserinfo();
      setUserInfo(userInfo);
    } catch (e: any) {
      setError([e.response.data.message]);
      console.error(e);
    }
  };

  const makeSpin = async () => {
    try {
      const spinResult = await spinSlotMachine();
      setSpinResult(spinResult);
      fetchUserInfo();
    } catch (e: any) {
      setError([e.response.data.message]);
      console.error(e);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const getImageForSpinResult = (result: string | undefined) => {
    switch (result) {
      case 'cherry':
        return '/cherry.png';
      case 'banana':
        return '/banana.png';
      case 'lemon':
        return '/lemon.png';
      case 'apple':
        return '/apple.png';
      default:
        return '';
    }
  };

  return (
    <div>
      <div className="Error">
        {!!error.length &&
          error.map((errorMessage, index) => {
            return (
              <Alert key={index} severity="error">
                {errorMessage}
              </Alert>
            );
          })}
      </div>
      <div className="Header">
        <h1>Slot Machine</h1>
      </div>
      <div className="User-card">
        <Card>
          <CardContent>
            <Typography variant="h4" component="div">
              User name: {userinfo?.userName}
            </Typography>
            <Typography component="div" sx={{ fontSize: 20 }}>
              Coins: {userinfo?.coins}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="Card-Slot-Machine">
        <Card>
          <CardContent sx={{ width: '1000px', height: '500px' }}>
            {spinResult ? (
              <Typography>
                <img
                  className="FruitImage"
                  src={getImageForSpinResult(spinResult?.result1)}
                />
                <img
                  className="FruitImage"
                  src={getImageForSpinResult(spinResult?.result2)}
                />
                <img
                  className="FruitImage"
                  src={getImageForSpinResult(spinResult?.result3)}
                />
              </Typography>
            ) : (
              <Typography>
                <img className="FruitImage" src={'/slot-machine.png'} />
                <img className="FruitImage" src={'/slot-machine.png'} />
                <img className="FruitImage" src={'/slot-machine.png'} />
              </Typography>
            )}
            <Typography>
              <h3>Your Win: {spinResult?.yourWin}</h3>
              <Button variant="contained" color="success" onClick={makeSpin}>
                Spin
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="Home-button">
        <Link to="/">
          <Button variant="contained" color="primary">
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SlotMachinePage;
