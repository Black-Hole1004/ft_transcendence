class ConversationValidator:
    @staticmethod
    def is_valid_conversation(participant_ids: list, current_user_id: int) -> int:
        return (len(set(participant_ids)) != 1 and current_user_id in participant_ids)


    @staticmethod
    def get_other_participant_id(participant_ids: list, current_user_id: int) -> bool:
        return participant_ids[1] if participant_ids[0] == current_user_id else participant_ids[0]
    
