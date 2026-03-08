import React from 'react'
import { LoginForm } from './_components/login-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslations } from 'next-intl';

function LoginPage() {
    const t = useTranslations('auth.login');
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-1/5 ">
        <CardHeader>
          <CardTitle className="text-xl gainzos-text-bright p-4">{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage