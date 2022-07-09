import styles from './Login.module.scss'
import { CompleteInput, Submit } from "src/components/Form"
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Head } from 'src/components/Head';
import userApi from 'src/services/axios/user';
import * as yup from 'yup';
import { useState } from 'react';


type Inputs = {
    email: string,
    password: string,
};


const schema = yup.object({
    email: yup.string().email("Insira um email válido").required("O email é obrigatório"),
    password: yup.string().required("A senha é obrigatória"),
}).required();


const LoginPage = () => {

    const [submitIsDisabled, setSubmitIsDisabled] = useState<boolean>(false);

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setSubmitIsDisabled(true)
        
        const permission = await userApi.login(data);
        
        if(permission) navigate('/', { replace: true })
        setSubmitIsDisabled(false)
    }

    return (
        <>
            <Head title='Entrar | CoreLab' />
            <div className={styles.Container}>
                <main className={styles.Main}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CompleteInput
                            label="Email" 
                            placeholder="Digite seu endereço de email" 
                            type="email" 
                            register={{...register('email')}} 
                            error={errors.email?.message} />

                        <CompleteInput
                            label="Senha" 
                            placeholder="Digite sua senha" 
                            type="password" 
                            register={{...register('password')}}
                            error={errors.password?.message} />

                        <div className={styles.submit_container}>
                            <Submit title="Entrar" disabled={submitIsDisabled} />
                        </div>
                    </form>
                </main>
                <p className={styles.Register}>
                    Não tem uma conta ainda? <Link to="/register">Registrar-se</Link>
                </p>
            </div>
        </>
    )
}


export default LoginPage;