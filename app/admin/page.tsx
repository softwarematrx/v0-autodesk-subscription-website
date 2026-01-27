'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/lib/admin-context';

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated } = useAdmin();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard');
    } else {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  return null;
}
