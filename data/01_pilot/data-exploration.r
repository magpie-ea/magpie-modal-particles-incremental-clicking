library(tidyverse)

d_unrel = read_csv('data_19-11-2019_unreliable.csv') %>% 
  filter(
  # discard training data
  trial_name != "poor_folks_visual_world_training",
  # remove test trial by FM
  submission_id != 380,
  # discard fllers
  condition != "filler"
) %>% 
  separate(
    col = pictureChoices,
    into = c("choice_initial", "choice_MP", "choice_final"),
    sep = "\\|"
  ) %>% 
  select(
    submission_id, trial_number, DP, 
    item_id, target, competitor,
    choice_initial,
    choice_MP,
    choice_final,
    comments
  ) %>% 
  pivot_longer(
    cols = contains("choice"),
    names_to = "position",
    values_to = "choice"
  ) %>% 
  mutate(
    position = str_remove(position, "choice_") %>% 
      factor(ordered = T, levels = c("initial", "MP", "final")),
    choice_type = case_when(
      choice == target ~ "target",
      choice == competitor ~ "competitor",
      TRUE ~ "distractor"
    ) %>% 
      factor(ordered = T, levels = c("target", "competitor", "distractor"))
  )
  



d = read_csv('data_19-10-2019.csv') %>% 
  filter(
    # discard training data
    trial_name != "poor_folks_visual_world_training",
    # remove incomplete data sets (coding mistake!)
    submission_id > 22,
    # discard fllers
    condition != "filler"
  ) %>% 
  separate(
    col = pictureChoices,
    into = c("choice_initial", "choice_MP", "choice_final"),
    sep = "\\|"
  ) %>% 
  select(
    submission_id, trial_number, DP, 
    item_id, target, competitor,
    choice_initial,
    choice_MP,
    choice_final,
    comments
  ) %>% 
  pivot_longer(
    cols = contains("choice"),
    names_to = "position",
    values_to = "choice"
  ) %>% 
  mutate(
    position = str_remove(position, "choice_") %>% 
      factor(ordered = T, levels = c("initial", "MP", "final")),
    choice_type = case_when(
      choice == target ~ "target",
      choice == competitor ~ "competitor",
      TRUE ~ "distractor"
    ) %>% 
      factor(ordered = T, levels = c("target", "competitor", "distractor"))
  )

d$group = "reliable"
d_unrel$group = "unreliable"
d_complete = rbind(d, d_unrel)

d %>% ggplot(aes(x = choice_type, fill = choice_type)) +
  geom_bar() +
  facet_grid(DP ~ position) +
  theme_minimal() +
  theme(legend.position = "none") +
  labs(x = "", y = "", title = "Counts of picture choices during incremental forced-choice task") +
  theme(axis.text.x = element_text(angle = 40, hjust = 1))
 
d_complete %>% 
  filter( position == "MP") %>% 
  ggplot(aes(x = choice_type, fill = choice_type)) +
  geom_bar() +
  facet_grid(DP ~ group) +
  theme_minimal() +
  theme(legend.position = "none") +
  labs(x = "", y = "", title = "Counts of picture choices during incremental forced-choice task") +
  theme(axis.text.x = element_text(angle = 40, hjust = 1))
  
