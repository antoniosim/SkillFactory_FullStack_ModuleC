<template>
    <div>
        <input type="text" v-model="todoText" placeholder="Ваша задача">
        <button @click="add" :disabled="!todoText">Добавить задачу</button>
        <button @click="delete_all">Очистить список</button>

        <div v-for="(item,key) in items" :key="key">
            <span>{{ key }} - {{ item.text }}</span>
            <button @click="delete_one(key)">Удалить</button>
        </div>

    </div>

</template>

<script>
    export default {
        name: "Todo",
        data() {
            return {
                todoText: '',
                items: []
            }
        },
        methods: {
            add() {
                this.items.push({text: this.todoText})
            },
            delete_all() {
                this.items = [];
            },
            delete_one(key) {
                this.items.splice(key, 1);
            }
        }

    }
</script>

<style scoped>

</style>