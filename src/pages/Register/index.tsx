import styles from './Register.module.scss'
import { CompleteInput, Submit } from "src/components/Form"
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Head } from 'src/components/Head';
import userApi from 'src/services/axios/user';
import { useState } from 'react';


type Inputs = {
    email: string,
    password: string,
    passwordConfirmation: string,
};


const schema = yup.object({
    email: yup.string().email("Insira um email válido").required("O email é obrigatório"),
    password: yup.string().required("A senha é obrigatória"),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'As senhas não são iguais')
}).required();


const RegisterPage = () => {

    const [submitIsDisabled, setSubmitIsDisabled] = useState<boolean>(false);

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const permission = await userApi.register(data);
        
        if(permission) navigate('/', { replace: true })
        setSubmitIsDisabled(false)
    };

    return (
        <>
            <Head title="Registro | CoreLab" />
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

                        <CompleteInput
                            label="Confirme sua senha" 
                            placeholder="Digite sua senha novamente" 
                            type="password" 
                            register={{...register('passwordConfirmation')}}
                            error={errors.passwordConfirmation?.message} />

                        <div className={styles.submit_container}>
                            <Submit title="Registrar-se" disabled={submitIsDisabled} />
                        </div>
                    </form>
                </main>
                <p className={styles.Login}>
                    Já tem uma conta? <Link to="/login">Entrar</Link>
                </p>
            </div>
        </>
    )
}




export default RegisterPage