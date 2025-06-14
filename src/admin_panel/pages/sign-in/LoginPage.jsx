import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../validation/admin.js';

import { Button, Grid, Typography, Box } from "@mui/material";
import { InputText } from "../../components/inputs/InputText";
import { ContainerCSS, Block } from "../../components/ui/ui.styles.js";

import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../store/thunk/admin.api.js';

import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../constants.js';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { status } = useSelector((state) => state.admin);
  
  const {
    control,
    formState: { errors, isSubmitSuccessful },
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
      navigate(`/${ROUTE.admin}/${ROUTE.allMovies}`, { replace: true });
    }
  }, [status, navigate]);
  
  return (
    <ContainerCSS maxWidth="xs" path>
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
