<!-- markdownlint-disable MD033 -->

# Rules

All rules from `eslint-plugin-mark`.

<!-- Auto-generated rule list start -->

<script setup>
import { ref } from 'vue';
import { data as ruleMetas } from './index.data.js';

const emojiRecommended = '✅';
const emojiFixable = '🔧';
const emojiSuggestion = '💡';
const emojiCM = '⭐';
const emojiGFM = '🌟';

const recommended = ref(null);
const fixable = ref(null);
const suggestion = ref(null);
const cm = ref(null);
const gfm = ref(null);
</script>

| Emoji                  | Description                                                                                                                                             |
| :--------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| {{ emojiRecommended }} | Using `recommended` config from `eslint-plugin-mark` in a config file enables this rule.                                                                |
| {{ emojiFixable }}     | Some problems reported by this rule are automatically fixable by `--fix` [CLI](https://eslint.org/docs/latest/use/command-line-interface#--fix) option. |
| {{ emojiSuggestion }}  | Some problems reported by this rule are manually fixable by editor [suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).    |
| {{ emojiCM }}          | Rule is applicable to [CommonMark](https://commonmark.org/).                                                                                            |
| {{ emojiGFM }}         | Rule is applicable to [GitHub Flavored Markdown](https://github.github.com/gfm/).                                                                       |

<div>
  <table>
    <tr>
      <th>Rule</th>
      <th>Description</th>
      <th>{{ emojiRecommended }}</th>
      <th>{{ emojiFixable }}</th>
      <th>{{ emojiSuggestion }}</th>
      <th>{{ emojiCM }}</th>
      <th>{{ emojiGFM }}</th>
    </tr>
    <tr v-for="ruleMeta in ruleMetas" :key="ruleMeta.name">
      <td><a :href="ruleMeta.name">{{ ruleMeta.name }}</a></td>
      <td>
        <!-- Backticks handling -->
        <template v-for="(part, index) in ruleMeta.description.split(/(`[^`]+`)/)">
          <code v-if="part.startsWith('`') && part.endsWith('`')">
            {{ part.slice(1, -1) }}
          </code>
          <template v-else>{{ part }}</template>
        </template>
      </td>
      <td>{{ ruleMeta.recommended ? emojiRecommended : '' }}</td>
      <td>{{ ruleMeta.fixable ? emojiFixable : '' }}</td>
      <td>{{ ruleMeta.suggestion ? emojiSuggestion : '' }}</td>
      <td>{{ ruleMeta.commonmark ? emojiCM : '' }}</td>
      <td>{{ ruleMeta.gfm ? emojiGFM : '' }}</td>
    </tr>
  </table>
</div>

<!-- Auto-generated rule list end -->
