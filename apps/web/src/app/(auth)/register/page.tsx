import React from 'react'
import { RegisterForm } from './_components/register-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslations } from 'next-intl';

function RegisterPage() {
  const t = useTranslations('auth.register');
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-1/5 ">
        <CardHeader>
          <CardTitle className="text-xl gainzos-text-bright p-4">{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterPage