<script setup>
  import { defineEmits } from 'vue';
  const emit = defineEmits(['click']);
</script>

<template>
    <div class="content" @click="emit('click')">
        
            <div class="text">
            <p>
                <span class="yellow">П</span>
                <img src="./../vendor/images/lupa.svg" class="icon" alt="о">
                <span class="yellow">мог</span>
                <span class="blue">атор</span>
            </p>
        </div>
    </div>
</template>

<style lang='scss' scoped>
    @import '../../assets/styles/mixins.scss';
    @import '../../assets/styles/variables.scss';

.content {
  width: 50%;
  height: 4em;
  background-color: $white;
  border-radius: 25rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.text {
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1;
}

.icon {
  width: 1.2em;
  height: 1.2em;
  display: inline-block;
  vertical-align: middle;
}

.yellow {
  color: $base-color-yellow;
}

.blue {
  color: $base-color-blue;
}

@media(max-width: 1000px){
  span{
    font-size: .8em;
  }
  .icon{
    width: 1em;
  }
}
@media(max-width: 700px){
  span{
    font-size: .6em;
  }
  .icon{
    width: .8em;
  }
}

@media(max-width: 500){
  span{
    font-size: .4em;
  }
  .icon{
    width: .6em;
  }
}

</style>
