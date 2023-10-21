<template>
  <div class="prose w-full max-w-2xl h-9">
    <h1>Log in to {{ course.title }}</h1>
    <button
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      @click="login"
    >
      Log in with Github
    </button>
  </div>
</template>

<script setup lang="ts">
const course = await useCourse()
const { auth } = useSupabaseClient()

const login = async () => {
  const { error } = await auth.signInWithOAuth({
    provider: 'github'
  })

  if (error) {
    console.error(error)
  }
}
</script>
