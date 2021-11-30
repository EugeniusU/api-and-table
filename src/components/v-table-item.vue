<template>
    <div class='v-table-item'>

        <div class='info_wrap'>           
            <div class='title node'>
                <button class='list_btn' @click='showContact'>
                    <i class='material-icons' v-if='!isShowContact'>add</i>
                    <i class='material-icons' v-if='isShowContact'>remove</i>
                </button>
                <span>
                    {{tableRow.title}}
                </span>
                <div class='tags'
                    v-for='(tag, index) in tableRow.tags'
                    :key='index'
                >
                   <div>{{tag}}</div>
                </div>
            </div>
            <div class='info__status node'>
                <span class='colorize_status' :style="{backgroundColor: tableRow.statusColor}">
                {{tableRow.statusName}}
                </span>
            </div>
            <div class='info__user node'>
                <i class='material-icons'>account_circle</i>
                <span>{{tableRow.user}}</span>
            </div>
            <div class='info__created_time node'>{{new Date(tableRow.createdAt * 1000).toLocaleString()}}</div>
            <div class='info__price node'>{{tableRow.price}}</div>
        </div>

        <div class='contact_wrap' v-if='isShowContact'>
            <div class='contact__name'>
                <i class='material-icons'>account_circle</i>
                <span>{{tableRow.contact.name}}</span>
            </div>
            <i class='material-icons' :title='tableRow.contact.phone'>contact_phone</i>
            <i class='material-icons' :title='tableRow.contact.mail'>email</i>
        </div>

    </div>    
</template>

<script>
export default({
    name: 'v-table-item',
    data() {
        return {
            isShowContact: false
        }
    },
    props: {
        tableRow: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        showContact() {
            this.isShowContact = !this.isShowContact;
        }
    }
    
})
</script>

<style>
.v-table-item {
    display: flex;
    flex-direction: column;
    min-height: 30px;
    margin-top: 15px;
    border-bottom: 1px solid grey;
}

.v-table-item:hover {
    background: lightgrey;
}

.info_wrap, .contact_wrap {
    display: flex;
    justify-content: space-between;
    width: 100%;
    min-height: 30px;
}

.contact_wrap {
    display: flex;
    width: calc(20% + 100px);
    justify-content: space-around;
}

.node {
    flex-basis: 20%;
}

.node:first-child {
    flex-basis: 30%;
}

.node:last-child {
    flex-basis: 10%;
}

.node:nth-child(4n) {
    flex-basis: 10%;
}

.node:nth-child(3n) {
    flex-basis: 10%;
}

.contact > div {
    border: none;
    background: #e7e7e7;
}

.list_btn {
    border: none;
    background: transparent;
    align-self: baseline;
    align-self: center;
}

.title_wrap, .title {
    display: flex;
}

.contact {
    display: flex;
}

.title span, .info__status, .info__user, .info__price, .info__created_time {
    align-self: center;
}

.contact__name, .info__user {
    display: flex;
}

.contact__name span, .info__user span {
    align-self: center;
}

.contact_wrap i {
    align-self: center;
}

.v-table i {
    margin-right: 10px;
}

.colorize_status {
    padding: 5px;
}

.list_btn i {
    margin-right: 0;
}

.tags {
    align-self: center;
    display: flex;   
    margin-left: 10px;
}

.tags div {
    margin-left: 5px;
    background-color: lightgreen;
    padding: 2px 4px;
}

</style>
