import { Stack, TextField, Typography, Button } from '@mui/material';

// Stateless child form component shared by login and register
const AuthForm = ({ user, onChange, onSubmit, isLogin }) => {
  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        {/* Only show first and last name on register */}
        {!isLogin && (
          <>
            <Stack spacing={0.5}>
              <Typography variant="subtitle2" fontWeight={500}>
                First Name
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                type="text"
                value={user.firstName}
                onChange={onChange}
                name="firstName"
                placeholder="first name"
                required
              />
            </Stack>
            <Stack spacing={0.5}>
              <Typography variant="subtitle2" fontWeight={500}>
                Last Name
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                type="text"
                value={user.lastName}
                onChange={onChange}
                name="lastName"
                placeholder="last name"
                required
              />
            </Stack>
          </>
        )}

        <Stack spacing={0.5}>
          <Typography variant="subtitle2" fontWeight={500}>
            Email
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            type="email"
            value={user.email}
            onChange={onChange}
            name="email"
            placeholder="email"
            required
          />
        </Stack>

        <Stack spacing={0.5}>
          <Typography variant="subtitle2" fontWeight={500}>
            Password
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            type="password"
            value={user.password}
            onChange={onChange}
            name="password"
            placeholder="password"
            required
          />
        </Stack>

        <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 1 }}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default AuthForm;
