'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRegisterUser } from '@/lib/hooks/auth';
import { User } from '@/lib/types/user';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function RegisterForm() {
  const t = useTranslations('auth.register');
  const router = useRouter();

  const { mutate: registerUser, isPending } = useRegisterUser();

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: User) => {
    const newUser: User = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    registerUser(newUser, {
      onSuccess: () => {
        toast.success(t('toast.success_register'));
        router.push('/login');
      },
      onError: (error) => {
        toast.error(t('toast.error_register'));
        console.error('Error registering user:', error);
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Form {...form}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base gainzos-text-bright">{t('usernameLabel')}</FormLabel>
              <FormControl>
                <Input placeholder={t('usernamePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base gainzos-text-bright">{t('emailLabel')}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t('emailPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base gainzos-text-bright">{t('passwordLabel')}</FormLabel>
              <FormControl>
                <Input type="password" placeholder={t('passwordPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? t('submitting') : t('submit')}
        </Button>
      </Form>
    </form>
  );
}
