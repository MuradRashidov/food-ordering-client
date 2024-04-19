import React from "react";
import {Auth0Provider} from "@auth0/auth0-react";
//import { useCreateMyUser } from "@/api/MyUserApi";
import { useNavigate } from "react-router-dom";
type Props = {
    children:React.ReactNode;
};

const Auth0ProviderWithNavigate  = ({children}:Props) => {
    const navigate = useNavigate();
    //const {createUser} = useCreateMyUser();
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENTID;
    const redirectUrl = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
    if (!domain || !clientId || !redirectUrl || !audience) {
        throw new Error("enable to initialise auth")
    }
    const onRedirectCallback = () => {
        navigate("/auth-callback")
      }
    return(
        <Auth0Provider 
            domain={domain} 
            clientId={clientId} 
            authorizationParams={{
            redirect_uri:redirectUrl,
            audience
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )
  
}
export default Auth0ProviderWithNavigate;