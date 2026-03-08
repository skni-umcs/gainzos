'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useLoginUser } from '@/lib/hooks/auth';
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

export function LoginForm() {
  const t = useTranslations('auth.login');
  const router = useRouter();

  const { mutate: loginUser, isPending } = useLoginUser();
  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: User) => {
    const user: User = {
      email: data.email,
      password: data.password,
    };

    loginUser(user, {
      onSuccess: () => {
        toast.success(t('toast.success_login'));
        router.push('/dashboard');
      },
      onError: (error) => {
        toast.error(t('toast.error_login'));
        console.error('Error logging in user:', error);
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Form {...form}>
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
