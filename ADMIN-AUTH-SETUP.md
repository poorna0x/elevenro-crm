# Admin Authentication Setup Guide

This guide will help you set up Supabase Auth for the admin dashboard.

## Step 1: Create Admin Users in Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Users**
3. Click **"Add user"**
4. Create admin users with any email and password you prefer

**Simple Setup:**
- Email: Any email you prefer (e.g., `admin@yourdomain.com`)
- Password: Any secure password you prefer
- **No metadata required** - Any authenticated user can access admin dashboard

### Option B: Using SQL (Alternative)

Run this SQL in your Supabase SQL editor:

```sql
-- Create admin users using Supabase Auth functions
-- Note: This requires the service role key

-- Admin User 1
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  last_sign_in_at,
  email_confirm_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@roservice.com',
  crypt('admin', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"role": "admin", "full_name": "Admin User"}',
  false,
  NOW(),
  '',
  '',
  '',
  ''
);

-- Admin User 2
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  last_sign_in_at,
  email_confirm_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@hydrogenro.com',
  crypt('admin', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"role": "admin", "full_name": "Admin User 2"}',
  false,
  NOW(),
  '',
  '',
  '',
  ''
);
```

## Step 2: Test the Login

1. Start your development server: `npm run dev`
2. Navigate to `/admin`
3. You should see the admin login form
4. Use the admin credentials you created in Supabase

## Step 3: Verify Authentication

After successful login, you should:
- Be redirected to the admin dashboard
- See your user information in the header
- Have access to all admin functions

## Troubleshooting

### If login fails:
1. Check that the user exists in Supabase Auth
2. Verify the user metadata contains `{"role": "admin"}`
3. Check browser console for any errors
4. Ensure Supabase environment variables are set correctly

### If you get "Access denied":
1. Make sure the user metadata has `role: "admin"`
2. Check that the user is confirmed in Supabase
3. Verify the user is not disabled

## Security Notes

- Change the default password in production
- Use strong, unique passwords
- Consider implementing 2FA for admin accounts
- Regularly audit admin access
- Use environment variables for sensitive configuration

## Important Notes

- **No metadata required** - Any user in Supabase Auth can access the admin dashboard
- You can create multiple admin users with different emails and passwords
- All authenticated users will have admin access
- Simple and straightforward setup
