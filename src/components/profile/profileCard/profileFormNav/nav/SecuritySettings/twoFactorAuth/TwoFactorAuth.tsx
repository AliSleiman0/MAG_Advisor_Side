//import React, { useCallback, useMemo, useState } from 'react';
//import { Col, Row } from 'antd';
//import { useTranslation } from 'react-i18next';
//import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
//import { TwoFactorOptions } from '@app/components/profile/profileCard/profileFormNav/nav/SecuritySettings/twoFactorAuth/TwoFactorOptions/TwoFactorOptions';
//import { TwoFactorSwitch } from '@app/components/profile/profileCard/profileFormNav/nav/SecuritySettings/twoFactorAuth/TwoFactorSwitch/TwoFactorSwitch';
//import { BaseButton } from '@app/components/common/BaseButton/BaseButton';

//import { notificationController } from '@app/controllers/notificationController';

//import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
//import { TwoFactorAuthOption } from '@app/interfaces/interfaces';
//import * as S from './TwoFactorAuth.styles';

//export interface CurrentOption {
//  value: 'phone' | 'email';
//  isVerified: boolean;
//}

//export type TwoFactorAuthOptionState = TwoFactorAuthOption | null;

//export const TwoFactorAuth: React.FC = () => {
//  const user = useAppSelector((state) => state.user.user);

//  const isNeedToShowVerifyBtn = useMemo(
//    () => (user?.email.name && !user?.email.verified) || (user?.phone.number && !user?.phone.verified),
//    [user],
//  );

//  const [isFieldsChanged, setFieldsChanged] = useState(Boolean(isNeedToShowVerifyBtn));
//  const [isLoading, setLoading] = useState(false);

//  const [isEnabled, setEnabled] = useState(Boolean(user?.email.verified || user?.phone.verified));
//  const [selectedOption, setSelectedOption] = useState<TwoFactorAuthOptionState>('phone');
//  const [isClickedVerify, setClickedVerify] = useState(false);

//  const dispatch = useAppDispatch();

//  const { t } = useTranslation();

//  const onClickVerify = () => {
//    setClickedVerify(true);
//  };

//  const onVerify = useCallback(() => {
//    if (user && selectedOption) {
//      setLoading(false);
//      setFieldsChanged(false);
//      setClickedVerify(false);
//      notificationController.success({ message: t('common.success') });

//      const newUser = { ...user, [selectedOption]: { ...user[selectedOption], verified: true } };

//      dispatch(setUser(newUser));
//    }
//  }, [dispatch, selectedOption, t, user]);

//  return (
//    <>
//      <BaseButtonsForm
//        name="twoFactorAuth"
       
//        isFieldsChanged={isFieldsChanged}
//        onFieldsChange={() => setFieldsChanged(true)}
      
//        footer={
//          (isEnabled && (
//            <BaseButton type="link" loading={isLoading} htmlType="submit">
//              {t('profile.nav.securitySettings.verify')}
//            </BaseButton>
//          )) || <span />
//        }
//        onFinish={onClickVerify}
//      >
//        <Row>
//          <Col span={24}>
//            <TwoFactorSwitch isEnabled={isEnabled} setEnabled={setEnabled} />
//          </Col>

//          {isEnabled && (
//            <Col span={24}>
//              <TwoFactorOptions selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
//            </Col>
//          )}
//        </Row>
//      </BaseButtonsForm>
//      <S.AuthModal
//        destroyOnClose
//        open={isClickedVerify}
//        footer={false}
//        closable={false}
//        onCancel={() => setClickedVerify(false)}
//      >
//        <SecurityCodeForm onBack={() => setClickedVerify(false)} onFinish={onVerify} />
//      </S.AuthModal>
//    </>
//  );
//};
