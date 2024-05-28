import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../validation/admin.js';

import { Button, Grid, Typography, Box } from "@mui/material";
import { InputText } from "../../components/inputs/InputText";
import { ContainerCSS, Block } from "../../components/ui/ui.styles.js";

import { useAuth } from '../../hooks/useAuth.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../store/apis/admin.api.js';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../constants.js';
import { useSessionStorage } from '../../hooks/useSessionStorage';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { status, loading, error } = useSelector((state) => state.admin);
  
  console.log(status, loading, error);
  const {
    control,
    formState: { errors, isSubmitSuccessful, isValid },
    reset,
    handleSubmit
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(loginSchema)
  });
  
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setShowPassword(false);
    }
  }, [isSubmitSuccessful, reset]);
  
  const onSubmit = (values) => {
    dispatch(adminLogin(values));
  };
  
  useEffect(() => {
    if (status === 200) {
      navigate(`/${ROUTE.admin}/${ROUTE.mainSlider}`, { replace: true });
    }
  }, [status, navigate]);
  
  return (
    <ContainerCSS maxWidth="xs">
      <Typography variant="h4" align="center" color="secondary">
        Log In
      </Typography>
      <Block>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Grid container spacing={15}>
            <Grid item xs={12} lg={12}>
              <InputText
                name="login"
                control={control}
                errors={errors}
                placeholder="Email"
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <InputText
                name="password"
                placeholder="Password"
                control={control}
                errors={errors}
                isIconEye={true}
                setShowPassword={setShowPassword}
                showPassword={showPassword}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <Button
                fullWidth
                // disabled={!isValid}
                variant="contained"
                type="submit">
                Sign in
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Block>
    </ContainerCSS>
  );
};
