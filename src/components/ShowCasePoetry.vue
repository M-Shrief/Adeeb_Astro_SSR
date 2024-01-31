<template>
    <section id="poetry">
        <h2 class="title">{{ui[currentLocale!].showCasePoetry.h2}}<span v-if="poetry.length === 0"><br>({{ui[currentLocale!].showCasePoetry.notAvailable}})</span></h2>
        <div class="poetry-container">
            <div v-for="singlePiece in poetry" :key="singlePiece.id">
                <div v-if="singlePiece.qoute" class="prose-item">
                    <p class="qoute" dir="rtl">{{ singlePiece.qoute }}</p>
                    <a v-if="!(routeName === 'poet')"
                        :href="'/poet/' + singlePiece.poet.id" class="details">{{
                        singlePiece.poet.name}}
                    </a>

                    <button 
                      @click="printsActions.add({ id: singlePiece.id, qoute: singlePiece.qoute })"
                      class="print-button">
                      {{ui[currentLocale!].showCasePoetry.addPrint}}
                    </button>
                </div>
                <div v-if="singlePiece.poem" class="chosenverse-item">
                    <div v-for="verse, index in singlePiece.verses" :key="index"
                        :class="singlePiece.verses!.length == 1 ? 'one-verse' : 'two-verse'">
                        <p class="first">{{ verse.first }}</p>
                        <p class="sec">{{ verse.sec }}</p>
                    </div>
                    <a :href="'/poem/' + singlePiece.poem.id" class="details" dir="rtl">{{
                        routeName == 'poet'
                        ? ui[currentLocale!].showCasePoetry.fullPoem
                        : singlePiece.poet.name + ' - ' + ui[currentLocale!].showCasePoetry.fullPoem}}
                    </a>
                    <button
                        @click="printsActions.add({ id: singlePiece.id, verses: singlePiece.verses })"
                        class="print-button">
                        {{ui[currentLocale!].showCasePoetry.addPrint}}
                    </button>
                </div>
            </div>
        </div>

    </section>
</template>


<script lang="ts" setup>
// Stores
import {actions as printsActions} from '../stores/prints'
// Types
import type { Poetry } from '../stores/__types__';
// Utils
import {ui} from '../i18n/ui'

const props = defineProps<{
  poetry: Poetry[];
  routeName?: string;
  currentLocale?: keyof typeof ui;
}>()

</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

$mainColor: var(--text1);
$secondaryColor: var(--surface1);
.title {
  text-align: center;
  background-color: $secondaryColor;
  color: $mainColor;
  padding: 0.3rem;
  margin: 1rem 0.3rem 0;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;

  @include mQ($breakpoint-lg) {
    padding: 0.3rem;
    margin: 0.6rem 0.3rem 0;
    font-size: 1.3rem;
  }

  @include mQ($breakpoint-md) {
    padding: 0.2rem;
    margin: 0.5rem 0.2rem 0;
    font-size: 1.2rem;
  }

  @include mQ($breakpoint-sm) {
    padding: 0.1rem;
    font-size: 1rem;
  }
}

.poetry-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0.5rem auto;
  row-gap: 1.5rem;
  column-gap: 0.3rem;
  @include mQ($breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @include mQ($breakpoint-sm) {
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }
}

.prose-item, .chosenverse-item {
    height: 90%;
    .details {
        font-size: 1rem;
        text-decoration: none;
        color: $mainColor;
        position: absolute;
        bottom: 0.7rem;
        right: 0.7rem;

        &:hover {
            font-weight: 600;
        }

        @include mQ($breakpoint-lg) {
            font-size: 0.8rem;
        }

        @include mQ($breakpoint-sm) {
            font-size: 0.6rem;
        }
    }
    .print-button {
        color: $mainColor;
        background: $secondaryColor;
        border: 1px solid $mainColor;
        position: absolute;
        bottom: 0.7rem;
        left: 0.7rem;
        border-radius: 1.5rem;
        padding: 0.3rem;
        margin-top: 0.5rem;
        &:hover {
            background: $mainColor;
            color: $secondaryColor;
        }
        @include mQ($breakpoint-sm) {
            font-size: 0.5rem;
        }
        @include mQ($breakpoint-md) {
            font-size: 0.6rem;
        }
        @include mQ($breakpoint-lg) {
            font-size: 0.6rem;
        }
    }
}

.prose-item {
  color: $mainColor;
  background: $secondaryColor;
  position: relative;
  display: flex;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 1.5rem;
  padding: 0.3rem;
  padding-bottom: 1.5rem;

  @include mQ($breakpoint-md) {
    padding: 0.3rem;
    margin: 0.3rem;
  }

  @include mQ($breakpoint-sm) {
    padding: 0.1rem;
    padding-bottom: 1rem;
    margin: 0.2rem;
  }

  .qoute {
    width: 100%;
    text-align: center;
    place-self: center;
    font-size: 1.2rem;
    
    @include mQ($breakpoint-lg) {
      font-size: 1.1rem;
    }

    @include mQ($breakpoint-md) {
      font-size: 1rem;
    }

    @include mQ($breakpoint-sm) {
      font-size: 0.8rem;
    }
  }
}
.chosenverse-item {
  color: $mainColor;
  background: $secondaryColor;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 1.5rem;
  padding: 0.3rem;
  padding-bottom: 1.5rem;

  @include mQ($breakpoint-lg) {
    padding: 0.3rem;
    padding-bottom: 1.4rem;
    margin: 0.3rem;
  }

  @include mQ($breakpoint-md) {
    padding: 0.2rem;
    padding-bottom: 1.2rem;
    margin: 0.3rem;
  }

  @include mQ($breakpoint-sm) {
    padding: 0.1rem;
    padding-bottom: 1.2rem;
    margin: 0.2rem;
  }

  .one-verse {
    font-size: 1.1rem;
    font-weight: 600;
    .first {
      margin-right: 0.4rem;
      direction: rtl;
    }

    .sec {
      margin-left: 0.4rem;
      direction: ltr;
    }

    @include mQ($breakpoint-lg) {
      font-size: 0.95rem;
      margin-top: 1.2rem;
    }

    @include mQ($breakpoint-md) {
      font-size: 0.9rem;
      margin-top: 1rem;
    }

    @include mQ($breakpoint-sm) {
      font-size: 0.8rem;
      margin-top: 0.5rem;
    }
  }

  .two-verse {
    font-size: 1rem;
    font-weight: 600;
    .first {
      margin-right: 0.4rem;
      direction: rtl;
    }

    .sec {
      margin-left: 0.4rem;
      direction: ltr;
    }

    @include mQ($breakpoint-lg) {
      font-size: 0.95rem;
    }

    @include mQ($breakpoint-md) {
      font-size: 0.8rem;
    }

    @include mQ($breakpoint-sm) {
      font-size: 0.8rem;
    }
  }
}
</style>