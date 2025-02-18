import { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import InputField from '../common/skeleton/InputField';
import { ForgotMailSchema } from '@/utils/validationSchemas/forgotMailSchema';
import { useAppDispatch } from '@/hooks/useRedux';
import { findUserEmailAction } from '@/redux/store/actions/auth/findEmailAction';
import { toast } from 'sonner';
import { forgotPasswordMailAction } from '@/redux/store/actions/auth/forgotPasswordMailAction';


interface FormValues {
  email: string;
}

const ConfirmEmailForgotPassword = () => {

    const initialValues: FormValues = {
      email: '',
    };

    const dispatch = useAppDispatch()

  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');


  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    setServerError('');

    console.log(values.email,"email valu")

    try {
        const response = await dispatch(findUserEmailAction(values.email));

        console.log(response,"useremailaction")

        await new Promise(resolve => setTimeout(resolve, 1500));

        if(!response.payload.success){
            toast.error("Not an existing email",{
                description: "signup please!!",
                position: "top-right"
            });
        } else {
            const responseForgotMail = await dispatch(forgotPasswordMailAction(values.email));

            console.log(responseForgotMail)
            if(responseForgotMail.payload.isGAuth){
              toast.error("This user password can't be resetted",{
                description: "This account is logged in google",
                position: "top-right"
              });
              return;
            }
            setIsSuccess(true);
        }
    } catch (err) {
      setServerError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to login
        </Button>

        <Card className="w-full border-none shadow-lg">
          <CardHeader className="space-y-6">
            <div className="w-full flex justify-center">
              <div className="w-40 h-40 relative">
                <DotLottieReact
                  src="https://lottie.host/c9743ed5-95d3-42a6-b9fa-313db738dc1d/CAiN8VkDMj.json"
                  loop
                  autoplay
                />
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-center">
                Forgot Password?
              </CardTitle>
              <CardDescription className="text-center text-base">
                No worries! Enter your email and CodeAurora will send you reset instructions.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            {!isSuccess ? (
              <Formik
                initialValues={initialValues}
                validationSchema={ForgotMailSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <div className="space-y-2">
                      <InputField
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                      />
                    </div>

                    {serverError && (
                      <Alert variant="destructive" className="text-base">
                        <AlertDescription>{serverError}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-medium bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white transition-colors"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending Instructions...
                        </div>
                      ) : (
                        'Reset Password'
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            ) : (
              <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900 text-base">
                <AlertDescription className="text-green-800 dark:text-green-200">
                  Check your email for password reset instructions. If you don't see it, check your spam folder.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>

          <CardFooter className="flex justify-center">
            <span className="text-muted-foreground text-base">
              Remember your password?{' '}
              <Link 
                to="/signin" 
                className="text-orange-600 dark:text-orange-400 font-medium"
              >
                Log in
              </Link>
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ConfirmEmailForgotPassword;