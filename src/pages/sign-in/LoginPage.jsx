import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Grid, Typography, Box } from "@mui/material";
import { ContainerCSS, Block } from "../../components/ui/ui.styles.js";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { InputText } from "../../components/inputs/InputText";
import { useAuth } from '../../hooks/useAuth.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../store/api/admin.api.js';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state?.admin);
  
  const {
    control,
    formState: { errors, isSubmitSuccessful, isValid },
    reset,
    handleSubmit
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onSubmit'
  });
  
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setShowPassword(false);
    }
  }, [isSubmitSuccessful, reset]);
  
  const onSubmit = (values) => {
    dispatch(adminLogin(values))
    login(data.login)
  };
  
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
                control={control}
                errors={errors}
                isIconEye={true}
                setShowPassword={setShowPassword}
                showPassword={showPassword}
                placeholder="Password"
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <Button
                fullWidth
                disabled={!isValid}
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
