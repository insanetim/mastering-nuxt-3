<script setup>
const user = useSupabaseUser()

watchEffect(async () => {
  const route = useRoute()
  await useFetch(`/api/user/linkWithPurchase/${route.params.paymentId}`, {
    headers: useRequestHeaders(['cookie'])
  })

  await navigateTo('/', {
    replace: true
  })
})

const render = () => {}
</script>
