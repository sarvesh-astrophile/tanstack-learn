import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";
import Loader from "./loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function SignUpForm({
    onSwitchToSignIn,
    }: {
        onSwitchToSignIn: () => void;
    }) {

    const navigate = useNavigate(
        { from: "/"},
    );
    const { isPending } = authClient.useSession();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
        onSubmit: async ({ value }) => {
            await authClient.signUp.email(
                {
                    email: value.email,
                    name: value.name,
                    password: value.password,
                },
                {
                    onSuccess: () => {
                        navigate({ to: "/dashboard" });
                        toast.success("Signed up successfully");
                    },
                    onError: (error) => {
                        toast.error(error.error.message || error.error.statusText);
                    },
                }
            );
        },
        validators: {
            onSubmit: z.object({
                name: z.string().min(2, "Name must be at least 2 characters"),
                email: z.email("Invalid email address"),
                password: z.string().min(8, "Password must be at least 8 characters"),
            }),
        }
    });

    if (isPending) {
        return <Loader />;
    }

    return (
        <div className="mx-auto w-full mt-10 max-w-md p-6">
            <h1 className="mb-6 text-center text-3xl font-bold">Create an account</h1>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-4"
            >
                <div>
                    <form.Field name="name">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>Name</Label>
                                <Input 
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value} 
                                    onChange={(e) => field.handleChange(e.target.value)} 
                                    onBlur={field.handleBlur} 
                                />
                                {field.state.meta.errors.map((error) => (
                                    <p key={error?.message} className="text-red-500">
                                        {error?.message}
                                    </p>
                                ))}
                            </div>
                        )}
                    </form.Field>
                </div>

                <div>
                    <form.Field name="email">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>Email</Label>
                                <Input 
                                    id={field.name}
                                    name={field.name}
                                    type="email"
                                    value={field.state.value} 
                                    onChange={(e) => field.handleChange(e.target.value)} 
                                    onBlur={field.handleBlur} 
                                />
                                {field.state.meta.errors.map((error) => (
                                    <p key={error?.message} className="text-red-500">
                                        {error?.message}
                                    </p>
                                ))}
                            </div>
                        )}
                    </form.Field>
                </div>

                <div>
                    <form.Field name="password">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>Password</Label>
                                <Input 
                                    id={field.name}
                                    name={field.name}
                                    type="password"
                                    value={field.state.value} 
                                    onChange={(e) => field.handleChange(e.target.value)} 
                                    onBlur={field.handleBlur} 
                                />
                                {field.state.meta.errors.map((error) => (
                                    <p key={error?.message} className="text-red-500">
                                        {error?.message}
                                    </p>
                                ))}
                            </div>
                        )}
                    </form.Field>
                </div>

                <form.Subscribe>
                    {(state) => (
                        <Button type="submit" className="w-full" disabled={!state.canSubmit || state.isSubmitting}>
                            {state.isSubmitting ? "Submitting..." : "Create account"}
                        </Button>
                    )}
                </form.Subscribe>
            </form>

            <div>
                <Button variant="link" className="text-indigo-600 hover:text-indigo-800" onClick={onSwitchToSignIn} >Already have an account? Sign in</Button>
            </div>
        </div>
    )
}