import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { SignInSchema } from "../../validation/authorization";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { ContainerCSS, Block, InputLabelCSS, LinkCss, TitleGridCSS } from "../../components/ui/ui.styles.js";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
// import { signInAccount } from "../../api/auth";
import { toast } from "react-toastify";
import { InputText } from "../../components/inputs/InputText";
// import { useAuth } from "../../hooks/useAuth.jsx";

export const LoginPage = () => {
  // const {setAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const {
    control,
    formState: { errors, isSubmitSuccessful, isValid },
    reset,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    // resolver: yupResolver(SignInSchema),
  });
  
 /* const { refetch } = useQuery('authUser', signInAccount, {
    enabled: false,
    retry: 1,
    onSuccess: (data) => {
      console.log(data);
    },
    onError(error) {
      console.error(error);
    }
  });
  
  const { mutate } = useMutation(
    (data) => signInAccount(data),
    {
      onSuccess() {
        refetch().then(r => console.log('sing in data', r));
        // setAuth (data.email, data.password, roles, accessToken)
        toast.success('You successfully logged in');
        // navigate(`/${ROUTE.landing}`);
      },
      onError(error) {
        if (Array.isArray(error.response.data.error)) {
          (error).response.data.error.forEach((el) => toast.error(el.message));
        } else {
          toast.error(error.response.data.message);
        }
      },
    }
  );*/
  
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setShowPassword(false);
    }
  }, [isSubmitSuccessful, reset]);
  
  const onSubmitHandler = (values) => {
    // mutate(values);
  };
  
  return (
    <ContainerCSS maxWidth="xs">
      <TitleGridCSS container>
        <Typography variant="h4" align="center" color="secondary">
          Log In
        </Typography>
      </TitleGridCSS>
      <Block>
        <form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
          <Grid container spacing={15}>
            <Grid item xs={12} lg={12}>
              <InputText
                name="email"
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
        </form>
      </Block>
    </ContainerCSS>
  );
};
