<template>
  <v-card
    class="mt-3"
    height="100%"
  >
    <div
      v-if="!hideStatus"
      :style="hiddenStyle"
      class="Conversation"
      :class="{ '-expanded' : isExpanded, 'panel' : isExpanded }"
    >
      <div
        v-if="isExpanded"
        class="panel-heading conversation-heading"
      >
        <span class="title"> {{ $t('timeline.conversation') }} </span>
        <button
          v-if="collapsable"
          class="button-unstyled -link"
          @click.prevent="toggleExpanded"
        >
          {{ $t('timeline.collapse') }}
        </button>
      </div>
      <Prdata
        v-for="status in conversation"
        :key="status.id"
        ref="statusComponent"
        :inline-expanded="collapsable && isExpanded"
        :statusoid="status"
        :expandable="!isExpanded"
        :show-pinned="pinnedStatusIdsObject && pinnedStatusIdsObject[status.id]"
        :focused="focused(status.id)"
        :in-conversation="isExpanded"
        :highlight="getHighlight()"
        :replies="getReplies(status.id)"
        :in-profile="inProfile"
        :profile-user-id="profileUserId"
        class="conversation-status status-fadein panel-body"
        @goto="setHighlight"
        @toggleExpanded="toggleExpanded"
      />
    </div>
    <div
      v-else
      :style="hiddenStyle"
    />
  </v-card>
</template>

<script src="./prcard.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.Conversation {
  .conversation-status {
    border-left: none;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--border, $fallback--border);
    border-radius: 0;
  }

  &.-expanded {
    .conversation-status:last-child {
      border-bottom: none;
      border-radius: 0 0 $fallback--panelRadius $fallback--panelRadius;
      border-radius: 0 0 var(--panelRadius, $fallback--panelRadius) var(--panelRadius, $fallback--panelRadius);
    }
  }
}
</style>
