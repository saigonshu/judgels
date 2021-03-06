import { Card } from '@blueprintjs/core';
import * as React from 'react';

import { Item } from '../../../../../modules/api/sandalphon/problemBundle';
import { HtmlText } from '../../../../../components/HtmlText/HtmlText';

import { AnswerState } from '../../itemStatement';
import ItemEssayForm from './ItemEssayForm/ItemEssayForm';

export interface ItemEssayCardProps extends Item {
  className?: string;
  initialAnswer?: string;
  onSubmit?: () => Promise<any>;
  itemNumber: number;
}

export class ItemEssayCard extends React.PureComponent<ItemEssayCardProps> {
  render() {
    return (
      <Card className={this.props.className}>
        <div className="bundle-problem-statement-item__statement">
          <div className="__item-num">{this.props.itemNumber}.</div>
          <div className="__item-statement">
            <HtmlText>{this.props.config.statement}</HtmlText>
          </div>
        </div>
        <ItemEssayForm
          initialAnswer={this.props.initialAnswer}
          onSubmit={this.props.onSubmit}
          meta={this.props.meta}
          {...this.props}
          answerState={this.props.initialAnswer ? AnswerState.AnswerSaved : AnswerState.NotAnswered}
        />
      </Card>
    );
  }
}
