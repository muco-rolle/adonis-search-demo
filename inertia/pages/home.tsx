import { router } from '@inertiajs/react'
import { Box, Container, Text, Stack, TextInput, Loader } from '@mantine/core'
import { useDebouncedCallback, useDebouncedState } from '@mantine/hooks'
import { useState } from 'react'

type Users = Array<{ id: number; fullName: string; email: string }>

type HomePageProps = { users: Users }
export default function HomePage({ users }: HomePageProps) {
  const [isLoading, setIsLoading] = useState(false)

  const searchHandler = useDebouncedCallback((query: string) => {
    setIsLoading(true)
    router.get(
      `/?search=${query}`,
      {},
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess() {
          setIsLoading(false)
        },
      }
    )
  }, 500)
  return (
    <Container size="xs">
      <Stack>
        <Box my="xl">
          <TextInput
            placeholder="Search users..."
            onChange={(event) => {
              searchHandler(event.target.value)
            }}
            rightSection={isLoading && <Loader size={20} />}
          />
        </Box>
        <Stack component="ul">
          {users.length ? (
            users.map(({ id, fullName, email }) => {
              return (
                <li key={id}>
                  {fullName} - {email}
                </li>
              )
            })
          ) : (
            <Text>No users found</Text>
          )}
        </Stack>
      </Stack>
    </Container>
  )
}
